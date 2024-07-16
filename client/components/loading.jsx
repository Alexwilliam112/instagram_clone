import { Image, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default LoadingPage = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#050505", "#0f0f0f", "#050505"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Image source={require("../assets/loading.gif")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});
