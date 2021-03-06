import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from 'react';
import Style from '../../style';
import EllipsisMenuScreen from './EllipsisMenuScreen';
import LicensesScreen from './LicensesScreen';
import LicenseTextScreen from './LicenseTextScreen';
import NotFinancialAdviceScreen from './NotFinancialAdviceScreen';
import OptionAllyLicenseScreen from './OptionAllyLicenseScreen';
import ThirdPartyLicenseDetailScreen from './ThirdPartyLicenseDetailScreen';
import ThirdPartyLicensesScreen from './ThirdPartyLicensesScreen';
import { EllipsisMenuStackParamList } from './types';

const EllipsisMenuStack = createStackNavigator<EllipsisMenuStackParamList>();

const EllipsisMenuStackNavigator = () => (
  <EllipsisMenuStack.Navigator 
    headerMode="float" 
    screenOptions={{ 
      headerStyle: Style.navigationHeader,
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <EllipsisMenuStack.Screen
      name="EllipsisMenuScreen"
      component={EllipsisMenuScreen} 
      options={{ headerTitle: () => undefined, headerBackImage: () => <Ionicons name="close" size={25} /> }} />
    <EllipsisMenuStack.Screen
      name="NotFinancialAdviceScreen"
      component={NotFinancialAdviceScreen}
      options={{ headerTitle: "Not Financial Advice" }} />
    <EllipsisMenuStack.Screen
      name="LicensesScreen"
      component={LicensesScreen}
      options={{ headerTitle: "Licenses" }} />
    <EllipsisMenuStack.Screen
      name="ThirdPartyLicensesScreen"
      component={ThirdPartyLicensesScreen}
      options={{ headerTitle: "Third Party Licenses" }} />
    <EllipsisMenuStack.Screen
      name="ThirdPartyLicenseDetailScreen"
      component={ThirdPartyLicenseDetailScreen}
      options={{ headerTitle: "License Details" }} />
    <EllipsisMenuStack.Screen
      name="LicenseTextScreen"
      component={LicenseTextScreen}
      options={{ headerTitle: "License Text" }} />
  </EllipsisMenuStack.Navigator>
);

export default EllipsisMenuStackNavigator;