import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CheckpointListScreen from "../screens/CheckpointListScreen";
import CategoryListScreen from "../screens/CategoryListScreen";
import StockListScreen from "../screens/StockListScreen";
import ArchiveScreen from "../screens/ArchiveScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="CheckpointListScreen"
          component={CheckpointListScreen}
        />
        <Drawer.Screen
          name="CategoryListScreen"
          component={CategoryListScreen}
        />
        <Drawer.Screen name="StockListScreen" component={StockListScreen} />
        <Drawer.Screen name="ArchiveScreen" component={ArchiveScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
