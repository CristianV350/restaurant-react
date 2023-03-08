import React from "react";
import { StyleSheet, View } from "react-native";
import StockList from "../components/StockList";

export default function StockListScreen({ navigation, route }) {
  const { category, checkpoint } = route.params;
  return (
    <View style={styles.container}>
      <StockList
        category={category}
        checkpoint={checkpoint}
        navigation={navigation}
      />
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
