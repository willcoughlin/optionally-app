import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import Style from '../style';
import { EllipsisMenuStackParamList } from '../types';
import EllipsisMenuScreen from './EllipsisMenuScreen';
import NotFinancialAdviceScreen from './NotFinancialAdviceScreen';

const EllipsisMenuStack = createStackNavigator<EllipsisMenuStackParamList>();

const EllipsisMenuStackNavigator = () => (
  <EllipsisMenuStack.Navigator 
    headerMode="float" 
    screenOptions={{ headerStyle: Style.navigationHeader, headerTitle: () => undefined }}>
    <EllipsisMenuStack.Screen
      name="EllipsisMenuScreen"
      component={EllipsisMenuScreen} 
      options={{ headerBackImage: () => <Ionicons style={{paddingTop: 5}} name="close" size={30} /> }} />
    <EllipsisMenuStack.Screen
      name="NotFinancialAdviceScreen"
      component={NotFinancialAdviceScreen} />
  </EllipsisMenuStack.Navigator>
);

export default EllipsisMenuStackNavigator;