import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { clamp, ReText } from "react-native-redash";

const VOLUME_HEIGHT = 300;
const VOLUME_WIDTH = 140;
const BUFFER_HEIGHT = 20;

export default function App() {
  const height = useSharedValue(BUFFER_HEIGHT);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = height.value;
    },
    onActive: ({ translationY }, ctx) => {
      height.value = clamp(
        ctx.y - translationY,
        BUFFER_HEIGHT,
        VOLUME_HEIGHT + BUFFER_HEIGHT
      );
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const animatedHeighText = useDerivedValue(() =>
    String(Math.ceil(((height.value - BUFFER_HEIGHT) * 100) / VOLUME_HEIGHT))
  );

  const style1 = useAnimatedStyle(() => {
    return {
      height: height.value - BUFFER_HEIGHT,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.volumeContainer}>
        <Animated.View style={[styles.sliderInnerWarpper, style1]} />
        <PanGestureHandler onGestureEvent={onGestureEvent} minDist={0}>
          <Animated.View style={[styles.sliderOuterWarpper, style]} />
        </PanGestureHandler>
        <ReText style={styles.percent} text={animatedHeighText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  volumeContainer: {
    width: VOLUME_WIDTH,
    height: VOLUME_HEIGHT,
    borderRadius: 40,
    borderWidth: 0,
    overflow: "hidden",
    backgroundColor: "#999999",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderOuterWarpper: {
    width: VOLUME_WIDTH,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
  },
  sliderInnerWarpper: {
    backgroundColor: "#555555",
    width: VOLUME_WIDTH,
    position: "absolute",
    bottom: 0,
  },
  percent: {
    fontSize: 50,
    color: "#111111",
  },
});
