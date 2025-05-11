import { Animated } from "react-native";

export function interpolateColor(
  value: Animated.AnimatedValue,
  color1: string,
  color2: string
) {
  return value.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [color1, color1, color2],
  });
}
