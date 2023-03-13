import React, { useState } from "react";
import { View, Text, DatePickerAndroid, Button } from "react-native";
import moment from "moment";

const ArchiveScreen = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: startDate ? new Date(startDate) : new Date(),
        mode: "spinner",
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);
        setStartDate(date);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const handleEndDateChange = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: endDate ? new Date(endDate) : new Date(),
        mode: "spinner",
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);
        setEndDate(date);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const generateStockList = () => {
    if (!startDate || !endDate) {
      console.warn("Please select both start and end dates");
      return;
    }

    if (moment(endDate).isBefore(startDate)) {
      console.warn("End date cannot be before start date");
      return;
    }

    const start = moment(startDate).startOf("day");
    const end = moment(endDate).endOf("day");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>Select start date:</Text>
        <Button
          title={
            startDate ? moment(startDate).format("MMM D, YYYY") : "Select date"
          }
          onPress={handleStartDateChange}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>Select end date:</Text>
        <Button
          title={
            endDate ? moment(endDate).format("MMM D, YYYY") : "Select date"
          }
          onPress={handleEndDateChange}
        />
      </View>
      <Button title="Generate Stock List" onPress={generateStockList} />
    </View>
  );
};

export default ArchiveScreen;
