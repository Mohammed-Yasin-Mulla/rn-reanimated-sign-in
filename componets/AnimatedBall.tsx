import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { DimensionValue } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const AnimatedBall = ({ r }: { r: DimensionValue }) => {
  const hovering = useSharedValue({
    y: 0,
    x: 0,
  });

  const start = useSharedValue({ x: hovering.value.x, y: hovering.value.y });

  const startAnimation = () => {
    hovering.value = withSequence(
      withTiming(
        {
          y: 0,
          x: 0,
        },
        { duration: 1000 }
      ),
      withRepeat(
        withTiming(
          {
            y: 50,
            x: 0,
          },
          { duration: 1500 }
        ),
        -1,
        true
      )
    );
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: hovering.value.y }, { translateX: hovering.value.x }],
    };
  });

  const tab = Gesture.Pan()
    .onBegin(() => {
      cancelAnimation(hovering);
    })
    .onUpdate(({ translationY, translationX, absoluteX, absoluteY }) => {
      start.value = {
        x: hovering.value.x,
        y: hovering.value.y,
      };
      hovering.value = {
        y: translationY,
        x: translationX,
      };
    })

    .onFinalize(() => {
      runOnJS(startAnimation)();
    });

  return (
    <GestureDetector gesture={tab}>
      <Animated.View
        style={[
          {
            width: r,
            height: r,
          },
          animatedStyles,
        ]}>
        <LinearGradient
          colors={['#92FFC0', '#002661']}
          style={{ width: '100%', height: '100%', borderRadius: 99999 }}
        />
      </Animated.View>
    </GestureDetector>
  );
};
export default AnimatedBall;
