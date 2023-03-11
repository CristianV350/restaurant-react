import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CheckpointList from "../components/CheckpointList";
import { NavigationContainer } from "@react-navigation/native";

export default function CheckpointListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CheckpointList navigation={navigation}></CheckpointList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});
