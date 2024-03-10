import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const ErrorWrapper = ({
  isError,
  children,
}: {
  isError: boolean;
  children: React.ReactNode;
}) => {
  const offset = useSharedValue(0);

  const OFFSET = 8;
  const TIME = 100;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    if (isError) {
      shakeComp();
    }
  }, [isError]);

  const shakeComp = () => {
    offset.value = withSequence(
      // start from -OFFSET
      withTiming(-OFFSET, { duration: TIME / 2 }),
      // shake between -OFFSET and OFFSET 5 times
      withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
      // go back to 0 at the end
      withTiming(0, { duration: TIME / 2 })
    );
  };

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
