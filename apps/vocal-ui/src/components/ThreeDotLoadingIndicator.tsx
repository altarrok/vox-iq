import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { responsiveFontSize } from '../utils/responsiveFontSize';

const Dot: React.FC<{
  delay: number;
  duration: number;
}> = ({ delay, duration }) => {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.delay(duration),
        ]))
    ]).start();
  }, [scale]);

  return <Animated.View style={[styles.dot, { transform: [{ scale }] }]} />;
};

export const ThreeDotLoadingIndicator = () => (
  <View style={styles.container}>
    <Dot delay={0} duration={600} />
    <Dot delay={200} duration={600} />
    <Dot delay={400} duration={600} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dot: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(2),
    borderRadius: responsiveFontSize(1),
    backgroundColor: '#CBFF97',
    margin: responsiveFontSize(1),
  },
});