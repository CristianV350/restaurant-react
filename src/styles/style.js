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
  addButton: {
    backgroundColor: "#3CB371",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#d0d0d0",
    position: "relative", // Add this to enable absolute positioning of Menu
  },
});