import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import debounce from "../utils/debounce";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import DetailsModal from "./Modal";
import useIngredientStore from "./../store/ingredients.reducer";

function StockItem({ item, handleSetSelectedItem, navigation, setMode }) {
  const handleEdit = () => {
    setMode("edit");
    handleSetSelectedItem(item);
  };

  const handleDelete = () => {
    setMode("delete");
    handleSetSelectedItem(item);
  };

  return (
    <View key={item.id} style={styles.itemContainer}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.itemContent}>
          <Text style={styles.itemQuantity}>
            Quantity:{" "}
            <Span style={{ fontWeight: "bold" }}>{item.quantity}</Span>
          </Text>
          <Text style={styles.itemPrice}>
            Price: <Span style={{ fontWeight: "bold" }}>{item.price}</Span>
          </Text>
        </View>
      </View>
      <Menu style={global.menu}>
        <MenuTrigger>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions customStyles={{ optionsContainer: { marginTop: -50 } }}>
          <MenuOption onSelect={() => handleEdit(item.id)}>
            <Text style={global.menuOption}>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={() => handleDelete(item.id)}>
            <Text style={global.menuOption}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}
const StockList = ({ category, checkpoint, navigation }) => {
  const { ingredients, fetchIngredients, updateIngredient, addIngredient } =
    useIngredientStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [mode, setMode] = useState("view");

  useEffect(() => {
    fetchIngredients(category.id);
  }, []);

  const handleSetSelectedItem = (item) => {
    setSelectedItem(item);
  };

  const handleItemOnSave = (item) => {
    console.log(checkpoint);
    addIngredient({
      ...item,
      category_id: parseInt(category.id),
      checkpoint_id: parseInt(checkpoint.id),
    });
    handleItemOnClose();
  };
  const handleItemOnClose = () => {
    setMode("view");
    handleSetSelectedItem(null);
  };

  const handleAddIngredient = async () => {
    handleSetSelectedItem({
      id: null,
      name: "",
      quantity: 0,
      price: 0,
    });

    setMode("edit");
  };

  const renderItem = (data) => {
    const item = data.item;
    return (
      <StockItem
        item={item}
        selectedItem={selectedItem}
        handleSetSelectedItem={handleSetSelectedItem}
        setMode={setMode}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <DetailsModal
        key={mode}
        visible={mode === "edit"}
        item={selectedItem}
        onSave={handleItemOnSave}
        onClose={handleItemOnClose}
        itemType={"stock"}
      />
      <MenuProvider>
        <FlatList
          data={ingredients}
          renderItem={renderItem}
          style={{ height: 200 }}
        />
      </MenuProvider>
      <View style={global.footer}>
        <TouchableOpacity
          style={global.addButton}
          onPress={handleAddIngredient}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

import global from "../styles/style";
import { Span } from "@expo/html-elements";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#d0d0d0",
    position: "relative", // Add this to enable absolute positioning of Menu
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  itemName: {
    fontSize: 32,
    marginBottom: 5,
    fontWeight: "bold",
  },
  itemSize: {
    fontSize: 14,
    color: "#8E8E8E",
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
});

export default StockList;
