import { useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator, Button, Headline, Subheading, Title, RadioButton } from 'react-native-paper';
import OptionSelector from '../components/OptionSelector';
import UnderlyingSelectionCard from '../components/UnderlyingSelectionCard';
import { OptionsChainQueryData, OPTIONS_CHAIN_QUERY, PartialOptionsForExpiry } from '../graphql/queries';
import { CalculatorInput, OptionInput, OptionType, QueryStockArgs, StrategyType } from '../graphql/types';
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

        {optionsChainLoading && <ActivityIndicator style={{ marginTop: 20 }} animating={true} />}
        {optionsChainData && 
          <View style={{ marginTop: 10 }}>
            <Title>Strategy: {STRATEGY_DISPLAY_NAMES[route.params.strategy]}</Title>
            {screenState.showShortRadio && 
              <RadioButton.Group 
                onValueChange={newSelection => setScreenState({ ...screenState, isShortStrategy: newSelection == PositionType.Short })}
                value={screenState.isShortStrategy ? PositionType.Short : PositionType.Long}
              >
                <RadioButton.Item label="Long" value={PositionType.Long} />
                <RadioButton.Item label="Short" value={PositionType.Short} />
              </RadioButton.Group>
            }

            {/* Show single option selector for Call or Put strategy */}
            {[StrategyType.Call, StrategyType.Put].includes(route.params.strategy) && 
              <OptionSelector
                optionType={route.params.strategy.toString() as OptionType}
                options={optionsChainData.stock.optionsChain}
                onChangeSelection={selection => setScreenState({
                  ...screenState,
                  calculatorInput: {
                    ...screenState.calculatorInput,
                    ...(route.params.strategy == StrategyType.Call && !screenState.isShortStrategy && { longCall: selection }),
                    ...(route.params.strategy == StrategyType.Call && screenState.isShortStrategy && { shortCall: selection }),
                    ...(route.params.strategy == StrategyType.Put && screenState.isShortStrategy && { longPut: selection }),
                    ...(route.params.strategy == StrategyType.Put && screenState.isShortStrategy && { shortPut: selection })
                  }
                })} />
            }

            {route.params.strategy == StrategyType.StraddleStrangle &&
              <>
                <OptionSelector
                  optionType={OptionType.Call}
                  options={optionsChainData.stock.optionsChain}
                  onChangeSelection={selection => setScreenState({
                    ...screenState,
                    calculatorInput: {
                      ...screenState.calculatorInput,
                      ...(!screenState.isShortStrategy && { longCall: selection }),
                      ...(screenState.isShortStrategy && { shortCall: selection }),
                    }
                  })}
                  title="Call Leg" />
                <OptionSelector
                  optionType={OptionType.Put}
                  options={optionsChainData.stock.optionsChain}
                  onChangeSelection={selection => setScreenState({
                    ...screenState,
                    calculatorInput: {
                      ...screenState.calculatorInput,
                      ...(!screenState.isShortStrategy && { longPut: selection }),
                      ...(screenState.isShortStrategy && { shortPut: selection }),
                    }
                  })}
                  title="Put Leg" />
                </>
            }

            {[StrategyType.BullCallSpread, StrategyType.BearCallSpread, StrategyType.IronCondor].includes(route.params.strategy) &&
              <>
                <OptionSelector
                  optionType={OptionType.Call}
                  options={optionsChainData.stock.optionsChain}
                  onChangeSelection={selection => setScreenState({
                    ...screenState,
                    calculatorInput: {
                      ...screenState.calculatorInput,
                      longCall: selection
                    }
                  })}
                  title="Long Call Leg" />
                <OptionSelector
                  optionType={OptionType.Call}
                  options={optionsChainData.stock.optionsChain}
                  onChangeSelection={selection => setScreenState({
                    ...screenState,
                    calculatorInput: {
                      ...screenState.calculatorInput,
                      shortCall: selection
                    }
                  })}
                  title="Short Call Leg" />
              </>
            }

            {[StrategyType.BearPutSpread, StrategyType.BullPutSpread, StrategyType.IronCondor].includes(route.params.strategy) &&
              <>
                <OptionSelector
                  optionType={OptionType.Put}
                  options={optionsChainData.stock.optionsChain}
                  onChangeSelection={selection => setScreenState({
                    ...screenState,
                    calculatorInput: {
                      ...screenState.calculatorInput,
                      longPut: selection
                    }
                  })}
                  title="Long Put Leg" />
                <OptionSelector
                  optionType={OptionType.Put}
                  options={optionsChainData.stock.optionsChain}
                  onChangeSelection={selection => setScreenState({
                    ...screenState,
                    calculatorInput: {
                      ...screenState.calculatorInput,
                      shortPut: selection
                    }
                  })}
                  title="Short Put Leg" />
              </>
            } 
          </View>
        }
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