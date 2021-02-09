import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Caption, Headline, Text } from 'react-native-paper';
import mainStyle from '../styles/main-style';
import { StackParamList, STRATEGY_DISPLAY_NAMES } from '../types';

type SelectOptionLegsScreenProps = {
  route: RouteProp<StackParamList, 'SelectOptionLegsScreen'>;
  navigation: StackNavigationProp<StackParamList, 'SelectOptionLegsScreen'>;
};

const SelectOptionLegsScreen = ({ route, navigation }: SelectOptionLegsScreenProps) => {
  return (
    <View style={mainStyle.container}>
      <View>
        <Headline>Finally, choose your options</Headline>
      </View>
      
      <Text>{JSON.stringify(route.params)}</Text>

      <Button 
        disabled={true}
        mode="contained" 
        style={{ marginTop: 50 }} 
        onPress={() => {}}>
        Next
      </Button>
    </View>
  );
};

export default SelectOptionLegsScreen;