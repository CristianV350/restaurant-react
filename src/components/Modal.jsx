import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DetailsModal = ({ visible, onClose, item, onSave, itemType }) => {
  const [name, setName] = useState(item?.name, "");
  const [title, setTitle] = useState(item?.title, "");
  const [address, setAddress] = useState(item?.address, "");
  const [price, setPrice] = useState(item?.price?.toString(), 0);
  const [quantity, setQuantity] = useState(item?.quantity?.toString(), 0);
  const [measure, setMeasure] = useState(item?.measure, "");

  const handleSave = () => {
    onSave({ name, title, price, quantity, measure, address });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onPressIn={onClose}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit {itemType}</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Name:</Text>
            <TextInput
              style={styles.formInput}
              value={name}
              onChangeText={setName}
            />
          </View>
          {itemType === "checkpoint" && ( // only show price for stock items
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Address:</Text>
              <TextInput
                style={styles.formInput}
                value={address}
                keyboardType="text"
                onChangeText={setAddress}
              />
            </View>
          )}
          {itemType === "stock" && ( // only show price for stock items
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Price:</Text>
              <TextInput
                style={styles.formInput}
                value={price}
                keyboardType="numeric"
                onChangeText={setPrice}
              />
            </View>
          )}
          {itemType === "stock" && ( // only show quantity for stock items}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Quantity:</Text>
              <TextInput
                style={styles.formInput}
                value={quantity}
                keyboardType="numeric"
                onChangeText={setQuantity}
              />
            </View>
          )}
          {itemType === "stock" && ( // only show quantity for stock items}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Measure:</Text>
              <TextInput
                style={styles.formInput}
                value={measure}
                onChangeText={setMeasure}
              />
            </View>
          )}
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DetailsModal;
