import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Platform } from "react-native";
import ArchiveService from "../services/ArchiveService";
import ArchiveList from "../components/ArchiveList";
// import { Platform } from "react-native-web";

const ArchiveScreen = ({ navigation, route }) => {
  let checkpoint = {};
  if (route.params && route.params.checkpoint) {
    checkpoint = route.params.checkpoint;
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setEndDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const generateStockList = async () => {
    let pdf = await ArchiveService.export({});
    console.log(pdf);
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
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={handleStartDateChange}
          />
        )}
        <Button
          title={
            startDate ? moment(startDate).format("MMM D, YYYY") : "Select date"
          }
          onPress={showDatepicker}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>Select end date:</Text>
        <Button
          title={
            endDate ? moment(endDate).format("MMM D, YYYY") : "Select date"
          }
          onPress={showTimepicker}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={handleEndDateChange}
          />
        )}
      </View>
      <Button title="Generate Stock List" onPress={generateStockList} />
      <ArchiveList
        navigation={navigation}
        checkpoint={checkpoint}
      ></ArchiveList>
    </View>
  );
};

export default ArchiveScreen;
