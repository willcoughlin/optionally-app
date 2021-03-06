import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React from 'react';
import { Image, View } from 'react-native';
import { Caption, Divider, List } from 'react-native-paper';
import Style from '../style';
import { EllipsisMenuStackParamList } from '../types';


const EllipsisMenuScreen = ({ navigation }:  { navigation: StackNavigationProp<EllipsisMenuStackParamList, 'EllipsisMenuScreen'> }) => (
  <View style={Style.container}>
    <View>
      <Image source={require('../../../assets/cover.png')} style={{ height: 144, width: 350 }} resizeMode="contain" />
      <Divider />
      <List.Item
        title="Not Financial Advice"
        right={() => <List.Icon icon={() => <Ionicons style={{ paddingTop: 5 }} size={15} name="chevron-forward" />} /> }
        onPress={() => navigation.push('NotFinancialAdviceScreen')} />
      <Divider />
      <List.Item
        title="Licenses"
        right={() => <List.Icon icon={() => <Ionicons style={{ paddingTop: 5 }} size={15} name="chevron-forward" />} /> } />
      <Divider />
    </View>
    <View>
      <Caption style={{ textAlign: 'center' }}>App version: {Constants.manifest.version}</Caption>
      <Caption style={{ textAlign: 'center' }}>&copy;{new Date().getFullYear()} Will Coughlin</Caption>
    </View>
  </View>
);

export default EllipsisMenuScreen;