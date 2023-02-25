import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CategoryList from "../components/CategoryList";
import { NavigationContainer } from "@react-navigation/native";

export default function CategoryListScreen({ navigation, route }) {
  const { checkpoint } = route.params;
  return (
    <View style={styles.container}>
      <CategoryList
        navigation={navigation}
        checkpoint={checkpoint}
      ></CategoryList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});
