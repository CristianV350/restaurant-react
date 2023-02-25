import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  { id: "1", name: "Checkpoint 1" },
  { id: "2", name: "Checkpoint 2" },
  { id: "3", name: "Checkpoint 3" },
  { id: "4", name: "Checkpoint 4" },
  { id: "5", name: "Checkpoint 5" },
  { id: "6", name: "Checkpoint 6" },
];

export default function CheckpointList({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkpoints, setCheckpoints] = useState(DATA);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = DATA.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setCheckpoints(filteredData);
  };

  const handleAddCheckpoint = () => {
    const newCheckpoint = {
      id: `${checkpoints.length + 1}`,
      name: `Checkpoint ${checkpoints.length + 1}`,
    };
    setCheckpoints([...checkpoints, newCheckpoint]);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.checkpointItem}>
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
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search checkpoints..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.checkpointsList}>
        <FlatList
          data={checkpoints}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCheckpoint}
        >
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
  searchInput: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  checkpointsList: {
    flex: 1,
    padding: 16,
    alignContent: "center",
  },
  checkpointItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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
