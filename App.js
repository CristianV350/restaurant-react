import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CheckpointListScreen from './src/screens/CheckpointListScreen';
import CategoryListScreen from './src/screens/CategoryListScreen';
import StockListScreen from './src/screens/StockListScreen';
import LeftMenu from './src/components/LeftMenu';

// const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <LeftMenu ></LeftMenu>
       {/* <NavigationContainer>
         <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CheckpointListScreen" component={CheckpointListScreen} />
          <Stack.Screen name="CategoryListScreen" component={CategoryListScreen} />
          <Stack.Screen name="StockListScreen" component={StockListScreen} />

        </Stack.Navigator>
      </NavigationContainer>  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
  },
})
export default App