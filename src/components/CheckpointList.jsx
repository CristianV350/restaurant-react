import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCheckpointStore } from "../store/checkpoint.reducer";
import DetailsModal from "./Modal";

export default function CheckpointList({ navigation }) {
  const {
    selectedCheckpoint,
    checkpoints,
    handleSetSelectedCheckpoint,
    fetchCheckpoints,
    updateCheckpoint,
    addCheckpoint,
  } = useCheckpointStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [mode, setMode] = useState("view");

  useEffect(() => {
    fetchCheckpoints();
  }, []);

  const handleSetSelectedItem = (item) => {
    setSelectedItem(item);
  };

  const handleItemOnSave = async (item) => {
    let checkpoint = await addCheckpoint(item);
    if (!checkpoint) return;
    setRows([...rows, checkpoint]);
    handleItemOnClose();
    handleItemOnClose();
  };

  const handleItemOnClose = () => {
    setMode("view");
    handleSetSelectedItem(null);
  };

  const handleAddCheckpoint = () => {
    setMode("edit");
    handleSetSelectedItem({
      name: "",
      id: null,
      address: "",
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={global.itemContainer}>
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate("CategoryListScreen", { checkpoint: item })
          }
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
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
        itemType={"checkpoint"}
      />
      <View style={styles.checkpointsList}>
        <FlatList
          data={checkpoints}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={global.footer}>
        <TouchableOpacity
          style={global.addButton}
          onPress={handleAddCheckpoint}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
import global from "../styles/style";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  checkpointsList: {
    flex: 1,
    alignContent: "center",
  },
  checkpointName: {
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
