import { StyleSheet, View, AnimatableStringValue } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

import { StatusBar } from 'expo-status-bar';

import { colors } from './libs/theme';
import AnimatedBall from './componets/AnimatedBall';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1, position: 'relative' }}>
        <View style={styles.container}>
          <LinearGradient
            colors={colors.deepPurpleGradient}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
          <Card />
          <AnimatedBallsList />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
const AnimatedBallsList = () => {
  return (
    <>
      <AnimatedBall r={200} x={-12} y={-14} color="greenGradient" zIndex={3} />
      <AnimatedBall r={40} x={200} y={35} color="lightGreenGradient" />
      <AnimatedBall r={136} x={250} y={80} color="greenGradient" />
      <AnimatedBall r={80} x={250} y={340} color="lightGreenGradient" />
      <AnimatedBall r={184} x={50} y={580} color="greenGradient" zIndex={3} />
      <AnimatedBall r={228} x={280} y={650} color="lightGreenGradient" />
    </>
  );
};
function Card() {
  const transform = useSharedValue<{
    x: AnimatableStringValue;
    y: AnimatableStringValue;
  }>({ x: '0deg', y: '0deg' });

  const pan = Gesture.Pan()
    .onUpdate(e => {
      if (e.numberOfPointers === 2) {
        transform.value = { x: `${e.translationX}deg`, y: `${e.translationY}deg` };
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
          experimentalBlurMethod="dimezisBlurView"
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
