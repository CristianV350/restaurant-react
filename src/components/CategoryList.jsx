import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import debounce from "../utils/debounce";
import useCategoryStore from "../store/category.reducer";

function CategoryItem({
  item,
  selectedCategory,
  handleSetSelectedCategory,
  handleCategoryOnBlur,
  debouncedHandleCategoryTextChange,
  navigation,
}) {
  const isEditing = selectedCategory && selectedCategory.id === item.id;
  const [categoryName, setCategoryName] = useState(item.name);

  const handleChangeText = (text) => {
    setCategoryName(text);
    debouncedHandleCategoryTextChange(item.id, text);
  };

  const handleOnBlur = () => {
    handleCategoryOnBlur(item.id, categoryName);
    handleSetSelectedCategory(null);
  };

  const handleEdit = () => {
    handleSetSelectedCategory(item);
  };

  return (
    <View style={styles.categoryItem}>
      <TouchableOpacity style={styles.categoryContainer}>
        {isEditing ? (
          <TextInput
            autoFocus={true}
            style={styles.categoryNameInput}
            value={categoryName}
            onChangeText={handleChangeText}
            onBlur={handleOnBlur}
            onPointerEnter={handleOnBlur}
            returnKeyType="done"
          />
        ) : (
          <View style={styles.categoryNameContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("StockListScreen", { category: item })
              }
            >
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.enterButton}>
              <Text style={styles.enterButtonText} onPress={handleEdit}>
                EDIT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

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
  const [rows, setRows] = useState(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setRows(categories);
  }, [categories]);

  const debouncedHandleCategoryTextChange = debounce(
    (id, name) => updateCategory(id, name),
    500
  );

  const handleCategoryOnBlur = (id, name) => {
    if (!name) return;
    updateCategory(id, name);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = categories.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setRows(filteredData);
  };

  const handleAddCategory = async () => {
    const newCategory = {
      name: `Category ${categories.length + 1}`,
    };
    let category = await addCategory(newCategory);
    if (!category) return;
    setRows([...rows, category]);
  };

  const renderItem = ({ item }) => (
    <CategoryItem
      item={item}
      selectedCategory={selectedCategory}
      handleSetSelectedCategory={handleSetSelectedCategory}
      debouncedHandleCategoryTextChange={debouncedHandleCategoryTextChange}
      handleCategoryOnBlur={handleCategoryOnBlur}
      navigation={navigation}
    />
  );

  return (
    <View style={global.container}>
      <View style={global.searchContainer}>
        <TextInput
          style={global.searchInput}
          placeholder="Search categories"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedCategory}
      />

      <View style={global.actionBar}>
        <TouchableOpacity style={global.addButton} onPress={handleAddCategory}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

import global from "../styles/style";
const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryContainer: {
    width: "100%",
  },
  categoryNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 2,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  categoryName: {
    fontSize: 18,
    marginLeft: 16,
    color: "#303334",
  },
  enterButton: {
    backgroundColor: "#79c006",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  enterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  categoryNameInput: {
    fontSize: 16,
    borderRadius: 10,
    padding: 25,
    color: "#303334",
  },
});

export { CategoryList, CategoryItem };
