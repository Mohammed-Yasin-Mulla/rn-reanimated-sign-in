import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { colors } from './libs/theme';
import AnimatedBall from './componets/AnimatedBall';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1, position: 'relative' }}>
        <View style={styles.container}>
          <AnimatedBallsList />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
const AnimatedBallsList = () => {
  return (
    <>
      <AnimatedBall r={200} x={-12} y={-14} color="greenGradient" />
      <AnimatedBall r={40} x={200} y={35} color="lightGreenGradient" />
      <AnimatedBall r={136} x={250} y={80} color="greenGradient" />
      <AnimatedBall r={80} x={250} y={340} color="lightGreenGradient" />
      <AnimatedBall r={184} x={50} y={440} color="greenGradient" />
      <AnimatedBall r={228} x={280} y={650} color="lightGreenGradient" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
