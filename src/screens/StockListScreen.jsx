import React from "react";
import { StyleSheet, View } from "react-native";
import StockList from "../components/StockList";

export default function StockListScreen({ navigation, route }) {
  const { category, checkpoint, archive } = route.params;
  return (
    <View style={styles.container}>
      <StockList
        category={category}
        checkpoint={checkpoint}
        archive={archive}
        navigation={navigation}
      />
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
