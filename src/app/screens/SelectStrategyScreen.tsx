import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Headline, RadioButton, Subheading } from 'react-native-paper';
import { StrategyType } from '../graphql/types';
import mainStyle from '../styles/main-style';
import { StackParamList, STRATEGY_DISPLAY_NAMES } from '../types';

type SelectStrategyScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'SelectStrategyScreen'>;
};

const SelectStrategyScreen = ({ navigation }: SelectStrategyScreenProps) => {
  const [selection, setSelection] = React.useState('');

  const radioItemMapper = (strategy: StrategyType) => (
    <RadioButton.Item 
      key={strategy}
      label={STRATEGY_DISPLAY_NAMES[strategy]} 
      value={strategy} />
  );

  return (
    <View style={mainStyle.container}>
      <Headline>Now, choose a strategy</Headline>
      <RadioButton.Group  onValueChange={(newSelection) => setSelection(newSelection)} value={selection}>
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

      <Button 
        disabled={!selection}
        mode="contained" 
        style={{ marginTop: 50 }} 
        onPress={() => navigation.push('SelectOptionLegsScreen')}>
        Next
      </Button>
    </View>
  );
};

export default SelectStrategyScreen;