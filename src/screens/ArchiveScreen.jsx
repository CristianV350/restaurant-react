import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import moment from "moment";
import ArchiveService from "../services/ArchiveService";
import ArchiveList from "../components/ArchiveList";
import { MenuProvider } from "react-native-popup-menu";
// import { Platform } from "react-native-web";

const ArchiveScreen = ({ navigation, route }) => {
  let checkpoint = {};
  if (route.params && route.params.checkpoint) {
    checkpoint = route.params.checkpoint;
  }

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
    <View style={styles.container}>
      <ArchiveList
        navigation={navigation}
        checkpoint={checkpoint}
      ></ArchiveList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});

export default ArchiveScreen;
