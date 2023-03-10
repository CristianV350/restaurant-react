import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import debounce from "../utils/debounce";
import useCategoryStore from "../store/category.reducer";
import DetailsModal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";

function CategoryItem({
  item,
  setMode,
  navigation,
  checkpoint,
  handleSetSelectedItem,
}) {
  const handleEdit = (item) => {
    setMode("edit");
    handleSetSelectedItem(item);
  };
  const handleDelete = () => {
    setMode("delete");
    handleSetSelectedItem(item);
  };
  return (
    <View style={global.itemContainer}>
      <TouchableOpacity style={styles.categoryContainer}>
        <View style={styles.categoryNameContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("StockListScreen", {
                category: item,
                checkpoint,
              })
            }
          >
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
          <Menu style={global.menu}>
            <MenuTrigger>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </MenuTrigger>
            <MenuOptions
              customStyles={{ optionsContainer: { marginTop: -50 } }}
            >
              <MenuOption onSelect={() => handleEdit(item)}>
                <Text style={global.menuOption}>Edit</Text>
              </MenuOption>
              <MenuOption onSelect={() => handleDelete(item.id)}>
                <Text style={global.menuOption}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
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
    deleteCategory,
    addCategory,
  } = useCategoryStore();
  const [rows, setRows] = useState(categories);
  const [mode, setMode] = useState("view");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setRows(categories);
  }, [categories]);

  const handleSetSelectedItem = (item) => {
    console.log(item);
    handleSetSelectedCategory(item);
    console.log(selectedCategory);
  };

  const handleItemOnSave = async (item) => {
    let category = await addCategory(item);
    if (!category) return;
    setRows([...rows, category]);
    handleItemOnClose();
  };

  const handleItemOnClose = () => {
    setMode("view");
    handleSetSelectedItem(null);
  };

  const handleItemOnConfirm = async (id) => {
    setMode("view");
    await deleteCategory(id);
    handleSetSelectedItem(null);
  };

  const handleAddCategory = async () => {
    handleSetSelectedItem({
      id: null,
      name: "",
    });

    setMode("edit");
  };

  const renderItem = ({ item }) => (
    <CategoryItem
      item={item}
      setMode={setMode}
      navigation={navigation}
      checkpoint={checkpoint}
      handleSetSelectedItem={handleSetSelectedItem}
    />
  );

  return (
    <View style={global.container}>
      {mode == "edit" && (
        <DetailsModal
          visible={mode === "edit"}
          item={selectedCategory}
          onSave={handleItemOnSave}
          onClose={handleItemOnClose}
          itemType={"category"}
        />
      )}
      {mode == "delete" && (
        <ConfirmationModal
          visible={mode === "delete"}
          item={selectedCategory}
          onConfirm={handleItemOnConfirm}
          onClose={handleItemOnClose}
          itemType={"category"}
        />
      )}
      <MenuProvider>
        <FlatList
          data={rows}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedCategory}
        />
      </MenuProvider>

      <View style={global.footer}>
        <TouchableOpacity style={global.addButton} onPress={handleAddCategory}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

import global from "../styles/style";
const styles = StyleSheet.create({
  categoryContainer: {
    width: "100%",
  },
  categoryNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 18,
    marginLeft: 16,
    color: "#303334",
  },
  rowButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
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
  deleteButton: {
    backgroundColor: "#921",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  deleteButtonText: {
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
