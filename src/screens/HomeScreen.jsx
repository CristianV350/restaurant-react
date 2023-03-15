import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CategoryListScreen")}
      >
        <Text style={styles.buttonText}>Go to Category List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CheckpointListScreen")}
      >
        <Text style={styles.buttonText}>Go to Checkpoint List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ArchiveScreen")}
      >
        <Text style={styles.buttonText}>Create New List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default HomeScreen;
