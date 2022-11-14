import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, View, Dimensions } from "react-native";
// import styled, { ThemeContext } from "styled-components/native";

// const Container = styled.View`
//   position: absolute;
//   z-index: 2;
//   opacity: 0.3;
//   width: 100%;
//   height: 100%;
//   justify-content: center;
//   background-color: ${({ theme }) => theme.spinnerBackground};
// `;

const Spinner = () => {
  //   const theme = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"yellow"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    opacity: 0.3,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "green",
    justifyContent: "center",
  },
});

export default Spinner;
