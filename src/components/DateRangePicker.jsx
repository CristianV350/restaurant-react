import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => {
    setIsStartDatePickerVisible(true);
  };

  const showEndDatePicker = () => {
    setIsEndDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setIsStartDatePickerVisible(false);
  };

  const hideEndDatePicker = () => {
    setIsEndDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formatDate(startDate)}</Text>
      <TouchableOpacity style={styles.button} onPress={showStartDatePicker}>
        <Text style={styles.buttonText}>Select start date</Text>
      </TouchableOpacity>
      <Text style={styles.dateText}>{formatDate(endDate)}</Text>
      <TouchableOpacity style={styles.button} onPress={showEndDatePicker}>
        <Text style={styles.buttonText}>Select end date</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 18,
    margin: 10,
  },
});

export default DateRangePicker;
