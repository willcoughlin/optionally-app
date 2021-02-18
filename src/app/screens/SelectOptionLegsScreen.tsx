import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Card, Headline, Subheading } from 'react-native-paper';
import OptionSelector from '../components/OptionSelector';
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
          style={{ marginTop: 0 }}
          name={route.params.underlying.name}
          symbol={route.params.underlying.symbol} 
          exchange={route.params.underlying.exchange} 
          ask={route.params.underlying.ask}
          bid={route.params.underlying.bid}
          last={route.params.underlying.last} />

        {optionsChainLoading && <ActivityIndicator style={{ marginTop: 10 }} animating={true} />}
        {optionsChainData && 
          <>  
            <Card style={{ marginTop: 10 }}>
              <Card.Title title="Strategy" />
              <Card.Content>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: screenState.showShortRadio ? 'space-between': 'flex-start',
                  alignItems: 'center'
                }}>
                  <Subheading>{STRATEGY_DISPLAY_NAMES[route.params.strategy]}</Subheading>
                  {screenState.showShortRadio && 
                    <Picker
                      style={{ padding: 0, width: '40%' }}
                      selectedValue={screenState.isShortStrategy ? PositionType.Short : PositionType.Long}
                      onValueChange={newSelection => setScreenState({ ...screenState, isShortStrategy: newSelection == PositionType.Short })}
                    >
                      <Picker.Item value={PositionType.Long} label="Long" />
                      <Picker.Item value={PositionType.Short} label="Short" />
                    </Picker>
                  }
                </View>
              </Card.Content>
            </Card>
            <View style={{ marginTop: 10 }}>

              {/* Show single option selector for Call or Put strategy */}
              {[StrategyType.Call, StrategyType.Put].includes(route.params.strategy) && 
                <OptionSelector
                  title="Selection"
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
          </>
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