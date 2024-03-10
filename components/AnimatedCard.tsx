import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { AnimatableStringValue, Keyboard, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AnimatedButton from './AnimatedButton';
import { AnimatedInput } from './AnimatedInput';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ErrorText } from './ErrorText';
import { colors } from '../libs/theme';

type Inputs = {
  secretPhrase: string;
};

function AnimatedCard() {
  const [showForm, setShowForm] = useState(true);

  const transform = useSharedValue<{
    x: AnimatableStringValue;
    y: AnimatableStringValue;
  }>({ x: '0deg', y: '0deg' });

  const flipCard = () => {
    transform.value = withTiming({ x: '90deg', y: '90deg' }, { duration: 1000 });
  };

  const flipBackCard = () => {
    transform.value = withTiming({ x: '0deg', y: '0deg' }, { duration: 1000 });
  };

  const pan = Gesture.Pan()
    .onUpdate(e => {
      if (e.numberOfPointers === 2) {
        let x = e.translationX;
        let y = e.translationY;
        if (x > 30) {
          x = 30;
        } else if (x < -30) {
          x = -30;
        }
        if (y > 30) {
          y = 30;
        } else if (y < -30) {
          y = -30;
        }
        transform.value = withTiming({ x: `${x}deg`, y: `${-y}deg` }, { duration: 0 });
      }
    })
    .onFinalize(() => {
      transform.value = withTiming({ x: '0deg', y: '0deg' }, { duration: 1000 });
    });

  const rotateAnimatedValue = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      { rotateX: transform.value.y },
      { rotateY: transform.value.x },
    ],
  }));

  const onSuccessfulSubmit = () => {
    Keyboard.dismiss();
    flipCard();
    setTimeout(() => {
      setShowForm(false);
    }, 1000);
  };

  if (!showForm) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimatedButton
          title="Click to reset"
          onPress={() => {
            flipBackCard();
            setShowForm(true);
          }}
        />
      </View>
    );
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            width: '80%',
            height: 500,
            zIndex: 1,
            transform: [{ rotateX: '0deg' }, { rotateY: '55deg' }],
          },
          rotateAnimatedValue,
        ]}>
        <BlurView
          intensity={40}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 2,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 20,
            overflow: 'hidden',
          }}
          experimentalBlurMethod="dimezisBlurView">
          <EnterPhoneForm onSuccessfulSubmit={onSuccessfulSubmit} />
        </BlurView>
      </Animated.View>
    </GestureDetector>
  );
}

const EnterPhoneForm = ({ onSuccessfulSubmit }: { onSuccessfulSubmit: () => void }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>();

  const [mockState, setMockState] = useState({
    isLoading: false,
    onSuccess: false,
  });
  const onSubmit: SubmitHandler<Inputs> = () => {
    setMockState({ isLoading: true, onSuccess: false });
    setTimeout(() => {
      setMockState({ isLoading: false, onSuccess: true });
      setTimeout(() => {
        onSuccessfulSubmit();
      }, 3000);
    }, 3000);
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        gap: 24,
        alignItems: 'center',
      }}>
      <View style={{ gap: 4, width: '100%' }}>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 5,
          }}
          render={({ field: { onChange, value } }) => (
            <AnimatedInput
              label="Enter the secret phrase"
              required
              onChangeText={onChange}
              value={value}
              placeholder={"It's a secret 🤫 "}
              isError={!!errors.secretPhrase}
            />
          )}
          name="secretPhrase"
        />
        {errors.secretPhrase && (
          <ErrorText textColor={colors.white}>Thats not the right answer</ErrorText>
        )}
      </View>
      <AnimatedButton
        isLoading={mockState.isLoading}
        onError={!!errors.secretPhrase ?? false}
        onSuccess={mockState.onSuccess}
        title="Click to submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
export default AnimatedCard;
