import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Keyframe,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../libs/theme';
import LottieView from 'lottie-react-native';
type BackgroundColor = 'blue' | 'red' | 'deepPurple' | 'green';
type ButtonState = 'normal' | 'loading' | 'success' | 'error';
const AnimatedButton = ({
  title,
  onError,
  onSuccess,
  isLoading,
  onPress,
}: {
  title: string;
  isLoading?: boolean;
  onSuccess?: boolean;
  onError?: boolean;
  onPress: () => void;
}) => {
  const [buttonState, setButtonState] = useState<ButtonState>('normal');
  const backgroundColor = useSharedValue('blue');
  const borderColor = useSharedValue('blue');

  const animateBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
      borderColor: borderColor.value,
    };
  });

  const changeBackgroundColor = (color: BackgroundColor) => {
    borderColor.value = withTiming(colors[color], { duration: 1000 });

    if (color === 'red' || color === 'green') {
      backgroundColor.value = withTiming(colors.transparent, { duration: 300 });
      return;
    }
    backgroundColor.value = withTiming(colors[color], { duration: 1000 });
  };

  useEffect(() => {
    if (isLoading) {
      setButtonState('loading');
      changeBackgroundColor('deepPurple');
    } else if (onError) {
      changeBackgroundColor('red');
      setButtonState('error');
    } else if (onSuccess) {
      changeBackgroundColor('green');
      setButtonState('success');
    } else {
      changeBackgroundColor('blue');
      setButtonState('normal');
    }
  }, [isLoading, onError, onSuccess]);

  return (
    <>
      <Pressable onPress={onPress}>
        <Animated.View
          layout={LinearTransition.duration(800)}
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 12,
              borderRadius: 8,
              alignSelf: 'flex-start',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderWidth: 2,
              flexDirection: 'row',
              alignItems: 'center',
              maxHeight: 50,
            },
            animateBackgroundColor,
          ]}>
          {buttonState === 'normal' && (
            <Animated.Text
              entering={enteringKeyframe.delay(200)}
              exiting={exitingKeyframe}
              style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
              {title}
            </Animated.Text>
          )}
          {buttonState === 'loading' && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Animated.View entering={enteringKeyframe} exiting={exitingKeyframe}>
                <LottieView
                  autoPlay
                  loop
                  source={require('../assets/lottie-files/loading.json')}
                  style={{ width: 30, height: 30 }}
                />
              </Animated.View>
              <Animated.Text
                entering={enteringKeyframe}
                exiting={exitingKeyframe}
                style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
                Loading
              </Animated.Text>
            </View>
          )}
          {buttonState === 'error' && <ErrorIndicator />}
          {buttonState === 'success' && <SuccessIndicator />}
        </Animated.View>
      </Pressable>
    </>
  );
};

const ErrorIndicator = () => {
  return (
    <>
      <Animated.View entering={enteringKeyframe.delay(600)} exiting={exitingKeyframe}>
        <LottieView
          autoPlay
          loop
          source={require('../assets/lottie-files/error.json')}
          style={{ width: 40, height: 40 }}
        />
      </Animated.View>

      <Animated.Text
        layout={LinearTransition}
        entering={enteringKeyframe.delay(600)}
        exiting={exitingKeyframe}
        style={{
          color: colors.white,
          fontSize: 14,
          textAlign: 'center',
        }}>
        Error occurred
      </Animated.Text>
    </>
  );
};

const SuccessIndicator = () => {
  return (
    <>
      <Animated.View entering={enteringKeyframe.delay(600)} exiting={exitingKeyframe}>
        <LottieView
          autoPlay
          loop={false}
          source={require('../assets/lottie-files/success.json')}
          style={{ width: 40, height: 40 }}
        />
      </Animated.View>

      <Animated.Text
        layout={LinearTransition}
        entering={enteringKeyframe.delay(600)}
        exiting={exitingKeyframe}
        style={{
          color: colors.white,
          fontSize: 14,
          textAlign: 'center',
        }}>
        Success
      </Animated.Text>
    </>
  );
};

const enteringKeyframe = new Keyframe({
  0: {
    transform: [{ translateY: -13 }],
    opacity: 0,
  },
  100: {
    transform: [{ translateY: 0 }],
    opacity: 1,
  },
}).duration(300);

const exitingKeyframe = new Keyframe({
  0: {
    transform: [{ translateY: 0 }],
    opacity: 1,
  },
  100: {
    transform: [{ translateY: 13 }],
    opacity: 0,
  },
}).duration(100);

export default AnimatedButton;
