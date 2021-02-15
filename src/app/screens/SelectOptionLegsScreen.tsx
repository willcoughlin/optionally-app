import { useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator, Button, Headline, Subheading, Title, RadioButton } from 'react-native-paper';
import UnderlyingSelectionCard from '../components/UnderlyingSelectionCard';
import { OptionsChainQueryData, OPTIONS_CHAIN_QUERY, PartialOptionsForExpiry } from '../graphql/queries';
import { CalculatorInput, OptionType, QueryStockArgs, StrategyType } from '../graphql/types';
import mainStyle from '../styles/main-style';
import { PositionType, StackParamList, STRATEGY_DISPLAY_NAMES } from '../types';

type SelectOptionLegsScreenProps = {
  route: RouteProp<StackParamList, 'SelectOptionLegsScreen'>;
  navigation: StackNavigationProp<StackParamList, 'SelectOptionLegsScreen'>;
};

type SelectOptionLegsScreenState = {
  options?: PartialOptionsForExpiry[];
  calculatorInput: CalculatorInput;
  showShortRadio: boolean;
  isShortStrategy: boolean;
};

const SelectOptionLegsScreen = ({ route, navigation }: SelectOptionLegsScreenProps) => {
  const [screenState, setScreenState] = useState<SelectOptionLegsScreenState>({ 
    calculatorInput: { strategy: route.params.strategy },
    showShortRadio: [StrategyType.Call, StrategyType.Put, StrategyType.StraddleStrangle].includes(route.params.strategy),
    isShortStrategy: false
  });

  const {loading: optionsChainLoading, error: optionsChainError, data: optionsChainData} = useQuery<OptionsChainQueryData, QueryStockArgs>(
    OPTIONS_CHAIN_QUERY, { 
      variables: { symbol: route.params.underlying.symbol }
    });

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

        {optionsChainLoading && <ActivityIndicator animating={true} />}
        {optionsChainData && 
          <View>
            <Title>Strategy: {STRATEGY_DISPLAY_NAMES[route.params.strategy]}</Title>
            {screenState.showShortRadio && 
              <RadioButton.Group 
                onValueChange={(newSelection) => setScreenState({ ...screenState, isShortStrategy: newSelection == PositionType.Short })}
                value={screenState.isShortStrategy ? PositionType.Short : PositionType.Long}
              >
                <RadioButton.Item label="Long" value={PositionType.Long} />
                <RadioButton.Item label="Short" value={PositionType.Short} />
              </RadioButton.Group>
            }
            <Subheading>Long Call</Subheading>
            <Button 
              mode="outlined">
                Select Option
            </Button>
            <Subheading>Short Call</Subheading>
            <Button 
              mode="outlined">
                Select Option
            </Button>
            <Subheading>Long Put</Subheading>
            <Button 
              mode="outlined">
                Select Option
            </Button>
            <Subheading>Short Put</Subheading>
            <Button 
              mode="outlined">
                Select Option
            </Button>
          </View>
        }
      </View>

      {/* {strategy === StrategyType.Call && <Text>{STRATEGY_DISPLAY_NAMES[StrategyType.Call]}</Text>}
      {strategy === StrategyType.Put && <Text>{STRATEGY_DISPLAY_NAMES[StrategyType.Put]}</Text>}
      {strategy === StrategyType.StraddleStrangle && <Text>{STRATEGY_DISPLAY_NAMES[StrategyType.StraddleStrangle]}</Text>}
      {strategy === StrategyType.BullCallSpread && <Text>{STRATEGY_DISPLAY_NAMES[StrategyType.BullCallSpread]}</Text>}
      {strategy === StrategyType.BearCallSpread && <Text>{STRATEGY_DISPLAY_NAMES[StrategyType.BearCallSpread]}</Text>}
      {strategy === StrategyType.BearPutSpread && <Text>{STRATEGY_DISPLAY_NAMES[StrategyType.BearPutSpread]}</Text>}
      {strategy === StrategyType.BullPutSpread && <Text>{STRATEGY_DISPLAY_NAMES[StrategyType.BullPutSpread]}</Text>}
      {strategy === StrategyType.IronCondor && <Text>{STRATEGY_DISPLAY_NAMES[StrategyType.IronCondor]}</Text>} */}

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