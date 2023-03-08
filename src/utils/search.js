const styles = StyleSheet.create({
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
})
const [searchQuery, setSearchQuery] = useState("");

const renderSearch = () => {
  return (
    <View style={styles.searchBar}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search checkpoints..."
      value={searchQuery}
      onChangeText={handleSearch}
    />
  </View>
  )
}

const handleSearch = (query) => {
  setSearchQuery(query);
  const filteredData = categories.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  setRows(filteredData);
};