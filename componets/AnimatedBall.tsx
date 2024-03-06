import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../libs/theme';

type GradientType = 'greenGradient' | 'redGradient' | 'lightGreenGradient';
const AnimatedBall = ({
  r,
  x,
  y,
  color,
  zIndex = 0,
}: {
  r: number;
  x: number;
  y: number;
  color: GradientType;
  zIndex?: number;
}) => {
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
        {
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
        }
      ),
      withRepeat(
        withTiming(
          {
            y: 50,
            x: 0,
          },
          { duration: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500 }
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
      start.value = {
        x: hovering.value.x,
        y: hovering.value.y,
      };
    })
    .onUpdate(({ translationY, translationX }) => {
      hovering.value = {
        y: translationY + start.value.y,
        x: translationX + start.value.x,
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
            position: 'absolute',
            width: r,
            height: r,
            top: y,
            left: x,
            zIndex,
          },
          animatedStyles,
        ]}>
        <LinearGradient
          colors={colors[color]}
          style={{ width: '100%', height: '100%', borderRadius: 99999 }}
        />
      </Animated.View>
    </GestureDetector>
  );
};
export default AnimatedBall;
