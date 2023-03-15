import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
