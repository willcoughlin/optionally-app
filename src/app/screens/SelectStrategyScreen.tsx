import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Headline, RadioButton, Subheading, Title } from 'react-native-paper';
import UnderlyingSelectionCard from '../components/UnderlyingSelectionCard';
import { StrategyType } from '../graphql/types';
import mainStyle from '../styles/main-style';
import { StackParamList, STRATEGY_DISPLAY_NAMES } from '../types';

type SelectStrategyScreenProps = {
  route: RouteProp<StackParamList, 'SelectStrategyScreen'>;
  navigation: StackNavigationProp<StackParamList, 'SelectStrategyScreen'>;
};

const SelectStrategyScreen = ({ route, navigation }: SelectStrategyScreenProps) => {
  const [selection, setSelection] = React.useState('');

  const radioItemMapper = (strategy: StrategyType) => (
    <RadioButton.Item 
      key={strategy}
      label={STRATEGY_DISPLAY_NAMES[strategy]} 
      value={strategy} />
  );

  return (
    <View style={mainStyle.container}>
      <View>
        <Headline>Now, choose a strategy</Headline>
        <RadioButton.Group  onValueChange={(newSelection) => setSelection(newSelection)} value={selection}>
          <Subheading>Basic</Subheading>
          {[
            StrategyType.Call, 
            StrategyType.Put, 
            StrategyType.StraddleStrangle
          ].map(radioItemMapper)}
          
          {/* <Subheading>Vertical Spreads</Subheading>
          {[
            StrategyType.BullCallSpread, 
            StrategyType.BearCallSpread, 
            StrategyType.BearPutSpread,
            StrategyType.BullPutSpread
          ].map(radioItemMapper)}

          <Subheading>Other</Subheading>
          {[StrategyType.IronCondor].map(radioItemMapper)} */}
        </RadioButton.Group>
      </View>

      <Button 
        disabled={!selection}
        mode="contained" 
        style={{ marginTop: 50 }} 
        onPress={() => navigation.push(
          'SelectOptionLegsScreen', { 
            underlying: route.params.underlying, 
            strategy: selection as StrategyType 
          }
        )}>
        Next
      </Button>
    </View>
  );
};

export default SelectStrategyScreen;