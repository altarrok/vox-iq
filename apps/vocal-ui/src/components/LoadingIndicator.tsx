import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";
import { responsiveFontSize } from "../utils/responsiveFontSize";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const LoadingIndicator = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <AnimatedSvg
        style={{ transform: [{ rotate: spin }] }}
        width={responsiveFontSize(15)}
        height={responsiveFontSize(15)}
        viewBox="0 0 52 51"
        fill="none"
      >
        <Path
          d="M23.195.41a2.518 2.518 0 11.554 5.004A20.142 20.142 0 0026 45.568v5.035C12.097 50.603.826 39.335.826 25.428c0-12.854 9.687-23.609 22.37-25.016V.41z"
          fill="#CBFF97"
        />
        <Path
          d="M36.88 5.391a2.518 2.518 0 013.505-.624 25.145 25.145 0 0110.79 20.664c0 13.904-11.27 25.175-25.175 25.175V45.57A20.139 20.139 0 0037.505 8.898a2.516 2.516 0 01-.624-3.507z"
          fill="#CBFF97"
        />
      </AnimatedSvg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});