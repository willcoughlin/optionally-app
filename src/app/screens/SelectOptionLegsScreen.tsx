import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import mainStyle from '../styles/main-style';
import { StackParamList, STRATEGY_DISPLAY_NAMES } from '../types';

type SelectOptionLegsScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'SelectOptionLegsScreen'>;
};

const SelectOptionLegsScreen = ({ navigation }: SelectOptionLegsScreenProps) => {
  return (
    <View style={mainStyle.container}>
      <Headline>Finally, choose your options</Headline>
      
      <Button 
        mode="contained" 
        style={{ marginTop: 50 }} 
        onPress={() => {}}>
        Next
      </Button>
    </View>
  );
};

export default SelectOptionLegsScreen;