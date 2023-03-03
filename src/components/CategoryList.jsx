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
      <TouchableOpacity
        style={styles.categoryContainer}
        onPress={() =>
          navigation.navigate("StockListScreen", { category: item })
        }
      >
        {isEditing ? (
          <TextInput
            autoFocus={true}
            style={styles.categoryNameInput}
            value={categoryName}
            onChangeText={handleChangeText}
            onBlur={handleOnBlur}
            returnKeyType="done"
          />
        ) : (
          <View style={styles.categoryNameContainer}>
            <Text style={styles.categoryName} onPress={handleEdit}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={styles.enterButton}
              onPress={() => handleSetSelectedCategory(item)}
            >
              <Ionicons
                name="arrow-forward-circle-outline"
                size={48}
                color="white"
              />
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
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
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
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  categoryItem: {
    backgroundColor: "#292929",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#fff",
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
    color: "#fff",
  },
  enterButton: {
    marginLeft: "auto",
    padding: 8,
    borderRadius: 20,
  },
  categoryNameInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 25,
    borderColor: "#fff",
    color: "#fff",
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

export { CategoryList, CategoryItem };
