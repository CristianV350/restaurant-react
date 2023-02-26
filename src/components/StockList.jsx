import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const data = [
  { id: 1, name: "Apple", price: 150, measure: "kg" },
  { id: 2, name: "Google", price: 300, measure: "kg" },
  { id: 3, name: "Amazon", price: 400, measure: "kg" },
  { id: 4, name: "Facebook", price: 250, measure: "kg" },
  { id: 5, name: "Netflix", price: 200, measure: "kg" },
];

const StockList = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      // onPress={() => navigation.navigate("StockDetails", { stock: item })}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      <View style={styles.flexContainer}>
        <TextInput style={styles.itemText}>{item.price}</TextInput>
        <TextInput style={styles.itemText}>{item.measure}</TextInput>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StockList;
