import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 0
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 21,
    position: "fixed",
    backgroundColor: "#333",
    right: 0,
    bottom: 0,
    height: 60,
  },
  addButton: {
    backgroundColor: "#3CB371",
    width: 65,
    height: 65,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    position:"absolute",
    bottom: 25
  },
  menu: {
    width: 50,
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