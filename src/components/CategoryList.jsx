import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import useCategoryStore from "../store/category.reducer";
import debounce from "../utils/debounce";

const DATA = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
];

export default function CategoryList({ checkpoint, navigation }) {
  const {
    selectedCategory,
    categories,
    handleSetSelectedCategory,
    fetchCategories,
    updateCategory,
    addCategory,
  } = useCategoryStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [rows, setRows] = useState([...categories]);

  useEffect(() => {
    setRows([...categories]);
  }, [categories]);

  console.log("CategoryList: ", rows);
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = rows.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setRows(filteredData);
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: `${rows.length + 1}`,
      name: `Category ${rows.length + 1}`,
    };
    addCategory(newCategory);
    setRows([...rows, newCategory]);
  };

  const handleCategoryNameSave = debounce((categoryId, newName) => {
    if (!newName) return;
    updateCategory(categoryId, newName);
  }, 500);

  const handleCategoryNameCancel = () => {
    // handleSetSelectedCategory(null);
  };

  const renderItem = ({ item }) => {
    const isEditing = selectedCategory && selectedCategory.id === item.id;
    return (
      <View style={styles.categoryItem}>
        <TouchableOpacity
          key={item.id}
          // onPress={() =>
          //   navigation.navigate("StockListScreen", { category: item })
          // }
          onPress={() => handleSetSelectedCategory(item)}
        >
          {isEditing ? (
            <TextInput
              onChangeText={(newName) =>
                handleCategoryNameSave(item.id, newName)
              }
              onBlur={(event) => {
                handleCategoryNameSave(item.id, event.nativeEvent.text);
                handleSetSelectedCategory(null);
              }}
              autoFocus={true}
              style={[
                styles.categoryNameInput,
                styles.categoryNameInputFocused,
              ]}
            >
              {item.name}
            </TextInput>
          ) : (
            <Text style={styles.categoryName}>{item.name}</Text>
          )}
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
          data={rows}
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
  editButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryNameInputFocused: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    height: 50,
    fontSize: 18,
  },
  categoryNameInput: {
    fontSize: 16,
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
