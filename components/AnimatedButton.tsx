import React, { useState } from 'react';
import { Button, Pressable } from 'react-native';
import Animated, {
  Keyframe,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../libs/theme';
type BackgroundColor = 'blue' | 'red' | 'deepPurple';
const AnimatedButton = ({
  title,
  onError,
  onSuccess,
  isLoading,
}: {
  title: string;
  isLoading?: boolean;
  onSuccess?: boolean;
  onError?: boolean;
  onPress: () => void;
}) => {
  const [Toggle, setToggle] = useState(false);
  const backgroundColor = useSharedValue('blue');

  const animateBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const changeBackgroundColor = (color: BackgroundColor) => {
    backgroundColor.value = withTiming(colors[color], { duration: 1000 });
  };

  return (
    <>
      <Animated.View
        layout={LinearTransition.duration(400)}
        style={[
          {
            paddingHorizontal: 8,
            paddingVertical: 10,
            borderRadius: 8,
            alignSelf: 'flex-start',
            marginLeft: 'auto',
            marginRight: 'auto',
          },
          animateBackgroundColor,
        ]}>
        <Pressable
          onPress={() => {
            setToggle(prev => !prev);
          }}>
          {Toggle && (
            <Animated.Text
              entering={enteringKeyframe}
              exiting={exitingKeyframe}
              style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
              {title}
            </Animated.Text>
          )}
          {!Toggle && (
            <Animated.Text
              entering={enteringKeyframe}
              exiting={exitingKeyframe}
              style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
              Press some where
            </Animated.Text>
          )}
        </Pressable>
      </Animated.View>
      <Button
        title="test"
        onPress={() => {
          changeBackgroundColor('red');
        }}
      />
      <Button
        title="test"
        onPress={() => {
          changeBackgroundColor('deepPurple');
        }}
      />
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
})
  .duration(300)
  .delay(400);

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
