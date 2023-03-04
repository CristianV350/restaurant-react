import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf7fa",
    paddingBottom: 100
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
  actionBar: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#fcf7fa",
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#5e4d45",
    padding: 16,
    borderRadius: 8,
  },
});