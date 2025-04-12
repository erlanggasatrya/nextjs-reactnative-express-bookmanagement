import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
import React from "react";

interface IContainerProps {
  children: React.ReactNode;
  isUnderStatusBar?: boolean;
  isPaddingHorizontal?: boolean;
}

export const WIDTH = Dimensions.get("screen").width;
export const HEIGHT = Dimensions.get("screen").height;

const Container = ({
  isUnderStatusBar = false,
  isPaddingHorizontal = true,
  children,
}: IContainerProps) => {
  return (
    <View
      style={[
        styles.container,
        isUnderStatusBar && { marginTop: StatusBar.currentHeight },
        isPaddingHorizontal && { paddingHorizontal: 24 },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: HEIGHT,
    width: WIDTH,
  },
});

export default Container;
