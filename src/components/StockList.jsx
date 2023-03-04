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

function StockItem({
  data,
  selectedItem,
  handleSetSelectedItem,
  handleItemOnBlur,
  debouncedHandleItemTextChange,
  navigation,
}) {
  const [item, setItem] = useState(data);
  const isEditing = selectedItem && selectedItem.id === item.id;

  const handleOnBlur = () => {
    handleItemOnBlur(item.id, categoryName);
    handleSetSelectedItem(null);
  };

  const handleEdit = () => {
    handleSetSelectedItem(item);
  };

  return (
    <View key={item.id} style={styles.itemContainer}>
      <DetailsModal
        visible={isEditing}
        item={item}
        onSave={handleOnBlur}
        onClose={handleOnBlur}
        itemType={"stock"}
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>Item: {item.category}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemPrice}>Price: {item.price}</Text>
      </View>
      <Menu style={styles.menu}>
        <MenuTrigger>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions customStyles={{ optionsContainer: { marginTop: -50 } }}>
          <MenuOption onSelect={() => handleEdit(item.id)}>
            <Text style={styles.menuOption}>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={() => handleDelete(item.id)}>
            <Text style={styles.menuOption}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}
const StockList = ({ category, navigation }) => {
  const { ingredients, fetchIngredients, updateIngredient, addIngredient } =
    useIngredientStore();
  const [rows, setRows] = useState(ingredients);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchIngredients(category.id);
  }, []);

  const debouncedHandleItemTextChange = debounce(
    (id, name) => updateItem(id, name),
    500
  );

  const handleSetSelectedItem = (item) => {
    setSelectedItem(item);
  };
  const handleItemOnBlur = (id, name) => {
    if (!name) return;
    updateItem(id, name);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = categories.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setRows(filteredData);
  };

  const handleAddIngredient = async () => {
    // const newItem = {
    //   name: `Item ${ingredients.length + 1}`,
    // };
    // let item = await addIngredient(newItem);
    // if (!item) return;
    // setRows([...rows, item]);
  };

  const renderItem = (item) => {
    <StockItem
      data={item}
      selectedItem={selectedItem}
      handleSetSelectedItem={handleSetSelectedItem}
      debouncedHandleItemTextChange={debouncedHandleItemTextChange}
      handleItemOnBlur={handleItemOnBlur}
      navigation={navigation}
    />;
  };

  return (
    <View style={styles.container}>
      <MenuProvider>
        <FlatList
          data={ingredients}
          renderItem={renderItem}
          style={{ height: 200 }}
        />
      </MenuProvider>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddIngredient}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 32,
    position: "fixed",
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#3CB371",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    position: "relative", // Add this to enable absolute positioning of Menu
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSize: {
    fontSize: 14,
    color: "#8E8E8E",
  },
  menu: {
    width: 100,
    marginLeft: "auto",
  },
  menuOption: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    Vertical: 8,
  },
});

export default StockList;
