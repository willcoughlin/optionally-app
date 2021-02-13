import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Headline, Text } from 'react-native-paper';
import UnderlyingSelectionCard from '../components/UnderlyingSelectionCard';
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
        <UnderlyingSelectionCard 
          name={route.params.underlying.name}
          symbol={route.params.underlying.symbol} 
          exchange={route.params.underlying.exchange} 
          ask={route.params.underlying.ask}
          bid={route.params.underlying.bid}
          last={route.params.underlying.last} />
      </View>
      
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