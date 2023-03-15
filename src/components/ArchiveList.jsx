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
import useArchiveStore from "../store/archive.reducer";
import DetailsModal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";

function ArchiveItem({
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
      <TouchableOpacity style={styles.archiveContainer}>
        <View style={styles.archiveNameContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("StockListScreen", {
                archive: item,
                checkpoint,
              })
            }
          >
            <Text style={styles.archiveName}>{item.name}</Text>
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

export default function ArchiveList({ checkpoint, navigation }) {
  const {
    selectedArchive,
    archives,
    handleSetSelectedArchive,
    fetchArchives,
    updateArchive,
    deleteArchive,
    addArchive,
  } = useArchiveStore();
  const [rows, setRows] = useState(archives);
  const [mode, setMode] = useState("view");

  useEffect(() => {
    fetchArchives();
  }, []);

  useEffect(() => {
    setRows(archives);
  }, [archives]);

  const handleSetSelectedItem = (item) => {
    console.log(item);
    handleSetSelectedArchive(item);
    console.log(selectedArchive);
  };

  const handleItemOnSave = async (item) => {
    let archive = await addArchive(item);
    if (!archive) return;
    setRows([...rows, archive]);
    handleItemOnClose();
  };

  const handleItemOnClose = () => {
    setMode("view");
    handleSetSelectedItem(null);
  };

  const handleItemOnConfirm = async (id) => {
    setMode("view");
    await deleteArchive(id);
    handleSetSelectedItem(null);
  };

  const handleAddArchive = async () => {
    handleSetSelectedItem({
      id: null,
      month: null,
      year: null,
      stockList: "",
    });

    setMode("edit");
  };

  const renderItem = ({ item }) => (
    <ArchiveItem
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
          item={selectedArchive}
          onSave={handleItemOnSave}
          onClose={handleItemOnClose}
          itemType={"archive"}
        />
      )}
      {mode == "delete" && (
        <ConfirmationModal
          visible={mode === "delete"}
          item={selectedArchive}
          onConfirm={handleItemOnConfirm}
          onClose={handleItemOnClose}
          itemType={"archive"}
        />
      )}
      <MenuProvider>
        <FlatList
          data={rows}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedArchive}
        />
      </MenuProvider>

      <View style={global.footer}>
        <TouchableOpacity style={global.addButton} onPress={handleAddArchive}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

import global from "../styles/style";
const styles = StyleSheet.create({
  archiveContainer: {
    width: "100%",
  },
  archiveNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  archiveName: {
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
  archiveNameInput: {
    fontSize: 16,
    borderRadius: 10,
    padding: 25,
    color: "#303334",
  },
});

export { ArchiveList, ArchiveItem };
