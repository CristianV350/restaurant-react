import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
];

export default function CategoryList({ checkpoint }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(DATA);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = DATA.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setCategories(filteredData);
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: `${categories.length + 1}`,
      name: `Checkpoint ${categories.length + 1}`,
    };
    setCategories([...categories, newCategory]);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.categoryItem}>
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate("StockListScreen", { category: item })
          }
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search checkpoints..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <Text style={styles.checkpoint}>Checkpoint: {checkpoint.name}</Text>
      <View style={styles.categoryList}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  searchBar: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  checkpoint: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 16,
  },
  searchInput: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  categoryList: {
    flex: 1,
    padding: 16,
    alignContent: "center",
  },
  categoryItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  actionBar: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 8,
  },
});
