import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DetailsModal = ({ visible, onClose, item, onConfirm, itemType }) => {
  const handleConfirm = () => {
    onConfirm(item.id);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
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
  confirmButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  confirmButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default DetailsModal;
