import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import Style from '../../style';
import { EllipsisMenuStackParamList } from './types';
import Constants from '../../constants';

const LicensesScreen = ({ navigation }:  { navigation: StackNavigationProp<EllipsisMenuStackParamList, 'LicensesScreen'> }) => (
  <View style={Style.container}>
    <View>
      <List.Item
        title="OptionAlly License"
        right={() => <List.Icon icon={() => <Ionicons style={{ paddingTop: 5 }} size={15} name="chevron-forward" />} /> }
        onPress={() => navigation.push('LicenseTextScreen', { licenseText: Constants.licenseText })} />
      <Divider />
      <List.Item
        title="Third Party Licenses"
        right={() => <List.Icon icon={() => <Ionicons style={{ paddingTop: 5 }} size={15} name="chevron-forward" />} /> } 
        onPress={() => navigation.push('ThirdPartyLicensesScreen')} />
    </View>
  </View>
);

export default LicensesScreen;