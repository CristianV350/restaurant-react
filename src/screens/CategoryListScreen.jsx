import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CategoryList from "../components/CategoryList";
import { NavigationContainer } from "@react-navigation/native";

export default function CategoryListScreen({ navigation, route }) {
  let checkpoint = {};
  if (route.params && route.params.checkpoint) {
    checkpoint = route.params.checkpoint;
  }
  let archive = {};
  if (route.params && route.params.archive) {
    archive = route.params.archive;
  }
  return (
    <View style={styles.container}>
      <CategoryList
        navigation={navigation}
        checkpoint={checkpoint}
        archive={archive}
      ></CategoryList>
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
