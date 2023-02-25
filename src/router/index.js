import { createStackNavigator } from '@react-navigation/stack';

import CheckpointListScreen from '../screens/CheckpointListScreen';
import CategoryListScreen from '../screens/CategoryListScreen';

// Define your screens
const screens = {
  CheckpointList: {
    screen: CheckpointListScreen,
  },
  CategoryList: {
    screen: CategoryListScreen,
  },
};

// Create the stack navigator
const CheckpointStackNavigator = createStackNavigator(screens);