import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import Style from '../style';
import EllipsisMenuScreen from './EllipsisMenuScreen';

const EllipsisMenuStack = createStackNavigator();

const EllipsisMenuStackNavigator = () => (
  <EllipsisMenuStack.Navigator 
    headerMode="float" 
    screenOptions={{ headerStyle: Style.navigationHeader, headerTitle: () => undefined }}>
    <EllipsisMenuStack.Screen
      name="EllipsisMenuScreen"
      component={EllipsisMenuScreen} 
      options={{ headerBackImage: () => <Ionicons style={{paddingTop: 5}} name="close" size={30} /> }} />
  </EllipsisMenuStack.Navigator>
);

export default EllipsisMenuStackNavigator;