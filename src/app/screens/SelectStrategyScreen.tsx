import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Headline, RadioButton, Subheading } from 'react-native-paper';
import { StrategyType } from '../graphql/types';
import Style from '../style';
import { MainStackParamList, STRATEGY_DISPLAY_NAMES } from '../types';

type SelectStrategyScreenProps = {
  route: RouteProp<MainStackParamList, 'SelectStrategyScreen'>;
  navigation: StackNavigationProp<MainStackParamList, 'SelectStrategyScreen'>;
};

const SelectStrategyScreen = ({ route, navigation }: SelectStrategyScreenProps) => {
  const [selection, setSelection] = React.useState('');

  const radioItemMapper = (strategy: StrategyType) => (
    <RadioButton.Item 
      color="#6200ee"
      key={strategy}
      label={STRATEGY_DISPLAY_NAMES[strategy]} 
      value={strategy} />
  );

  return (
    <View style={Style.container}>
      <View>
        <Headline>Now, choose a strategy</Headline>
        <View style={Style.standardTopMargin}>
          <RadioButton.Group onValueChange={(newSelection) => setSelection(newSelection)} value={selection}>
            <Subheading>Basic</Subheading>
            {[
              StrategyType.Call, 
              StrategyType.Put, 
              StrategyType.StraddleStrangle
            ].map(radioItemMapper)}
            
            <Subheading>Vertical Spreads</Subheading>
            {[
              StrategyType.BullCallSpread, 
              StrategyType.BearCallSpread, 
              StrategyType.BearPutSpread,
              StrategyType.BullPutSpread
            ].map(radioItemMapper)}

            <Subheading>Other</Subheading>
            {[StrategyType.IronCondor].map(radioItemMapper)}
          </RadioButton.Group>
        </View>
      </View>

      <Button 
        disabled={!selection}
        mode="contained" 
        style={Style.nextScreenButton} 
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