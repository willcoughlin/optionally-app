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
import Style from '../style';
import { PositionType, StackParamList, STRATEGY_DISPLAY_NAMES } from '../types';

/* Related types */
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

/* Screen definition */
const SelectOptionLegsScreen = ({ route, navigation }: SelectOptionLegsScreenProps) => {
  // Set up state
  const [screenState, setScreenState] = useState<SelectOptionLegsScreenState>({ 
    calculatorInput: { strategy: route.params.strategy },
    showShortRadio: [StrategyType.Call, StrategyType.Put, StrategyType.StraddleStrangle].includes(route.params.strategy),
    isShortStrategy: false
  });

  // Load options for selection
  const {loading: optionsChainLoading, error: optionsChainError, data: optionsChainData} = useQuery<OptionsChainQueryData, QueryStockArgs>(
    OPTIONS_CHAIN_QUERY, { 
      variables: { symbol: route.params.underlying.symbol }
    });

  return (
    <View style={Style.container}>
      <View>
        <Headline>Finally, choose your options</Headline>

        {/* Underlying card */}
        <UnderlyingSelectionCard 
          style={{ marginTop: 0 }}
          name={route.params.underlying.name}
          symbol={route.params.underlying.symbol} 
          exchange={route.params.underlying.exchange} 
          ask={route.params.underlying.ask}
          bid={route.params.underlying.bid}
          last={route.params.underlying.last} />

        {/* Indicate loading */}
        {optionsChainLoading && <ActivityIndicator style={Style.standardTopMargin} animating={true} />}
        
        {/* Done loading */}
        {optionsChainData && 
          <>  
            {/* Strategy display card */}
            <Card style={Style.standardTopMargin}>
              <Card.Title title="Strategy" />
              <Card.Content>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: screenState.showShortRadio ? 'space-between': 'flex-start',
                  alignItems: 'center'
                }}>
                  <Subheading>{STRATEGY_DISPLAY_NAMES[route.params.strategy]}</Subheading>
                  
                  {/* Show a picker if we need to choose long/short for strategy */}
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

            {/* Configure option legs below info cards */}
            <View style={Style.standardTopMargin}>

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

              {/* Show Call and Put selectors for Straddle/Strangle */}
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

              {/* For all below spread types, show long and short call selectors */}
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

              {/* For all below spread types, show long and short put selectors */}
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
        style={Style.nextScreenButton} 
        onPress={() => {}}
      >
        Next
      </Button>
    </View>
  );
};

export default SelectOptionLegsScreen;