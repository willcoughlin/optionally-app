import { useQuery } from '@apollo/client';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Headline, HelperText, Subheading, Title } from 'react-native-paper';
import OptionSelector from '../components/OptionSelector';
import UnderlyingSelectionView from '../components/UnderlyingSelectionView';
import { OptionsChainQueryData, OPTIONS_CHAIN_QUERY, PartialOptionsForExpiry } from '../graphql/queries';
import { CalculatorInput, OptionType, QueryStockArgs, StrategyType } from '../graphql/types';
import Style from '../style';
import { MainStackParamList, PositionType, STRATEGY_DISPLAY_NAMES } from '../types';

/* Related types */
type SelectOptionLegsScreenProps = {
  route: RouteProp<MainStackParamList, 'SelectOptionLegsScreen'>;
  navigation: StackNavigationProp<MainStackParamList, 'SelectOptionLegsScreen'>;
};

type SelectOptionLegsScreenState = {
  options?: PartialOptionsForExpiry[];
  calculatorInput: CalculatorInput;
  showShortRadio: boolean;
  isShortStrategy: boolean;
};

type CalculatorInputValidationDetails = [hasError: boolean, message?: string];

/* Helpers */
const validateCalculatorInput = (calculatorInput: CalculatorInput): CalculatorInputValidationDetails => {
  switch (calculatorInput.strategy) {
    // Call needs long call or short call
    case StrategyType.Call:
      return [!(calculatorInput.longCall || calculatorInput.shortCall)];
    // Put needs long put or short put
    case StrategyType.Put:
      return [!(calculatorInput.longPut || calculatorInput.shortPut)];
    // Straddle/Strangle needs long call and long put, or short call and short put, with call strike >= put strike
    case StrategyType.StraddleStrangle:
      const strikeErrorMsg = 'Call strike must be at or above put strike';
      if (calculatorInput.longCall && calculatorInput.longPut)
        return [calculatorInput.longCall.strike < calculatorInput.longPut.strike, strikeErrorMsg];
      if (calculatorInput.shortCall && calculatorInput.shortPut)
        return [calculatorInput.shortCall.strike < calculatorInput.shortPut.strike, strikeErrorMsg];
      return [false];
    // Bull call spread needs long call and short call, with long strike <= short strike
    case StrategyType.BullCallSpread:
      if (calculatorInput.longCall && calculatorInput.shortCall)
        return [calculatorInput.longCall.strike > calculatorInput.shortCall.strike, 'Long call strike must be below short call strike'];
      return [false];
    // Bear call spread needs long call and short call, with long strike >= short strike
    case StrategyType.BearCallSpread:
      if (calculatorInput.longCall && calculatorInput.shortCall)
        return [calculatorInput.longCall.strike < calculatorInput.shortCall.strike, 'Long call strike must be above short call strike'];
      return [false];
    // Bear put spread needs long put and short put, with long strike >= short strike
    case StrategyType.BearPutSpread:
      if (calculatorInput.longPut && calculatorInput.shortPut)
        return [calculatorInput.longPut.strike < calculatorInput.shortPut.strike, 'Long put strike must be above short put strike'];
      return [false];
    // Bull put spread needs long put and short put, with long strike <= short strike
    case StrategyType.BullPutSpread:
      if (calculatorInput.longPut && calculatorInput.shortPut)
        return [calculatorInput.longPut.strike > calculatorInput.shortPut.strike, 'Long put strike must be below short put strike'];
      return [false];
    // Iron condor needs all components with long call strike >= short call strike >= short put strike >= long put strike
    case StrategyType.IronCondor:
      if (calculatorInput.longCall && calculatorInput.shortCall && calculatorInput.longPut && calculatorInput.shortPut) {
        let result: CalculatorInputValidationDetails;
        // Is short call strike >= short put strike?
        result = [calculatorInput.shortCall.strike < calculatorInput.shortPut.strike, 'Short call strike must be above short put strike'];
        if (result[0])
          return result;
        // Is long call strike >= short call strike?
        result = [calculatorInput.longCall.strike < calculatorInput.shortCall.strike, 'Long call strike must be above short call strike'];
        if (result[0])
          return result;
        // Is short put strike >= long put strike?
        return [calculatorInput.longPut.strike > calculatorInput.shortPut.strike, 'Long put strike must be below short put strike'];
      }
      return [false];
    default:
      return [false];
  }
}

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
      fetchPolicy: 'no-cache',
      variables: { symbol: route.params.underlying.symbol }
    });

  const [inputHasError, inputErrorMessage] = validateCalculatorInput(screenState.calculatorInput);

  return (
    <View style={Style.container}>
      <View>
        <Headline>Finally, choose your options</Headline>

        {/* Underlying card */}
        <UnderlyingSelectionView 
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
            <View style={Style.standardTopMargin}>
              <Title>Strategy</Title>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: screenState.showShortRadio ? 'space-between': 'flex-start',
                alignItems: 'center'
              }}>
                <Subheading>{STRATEGY_DISPLAY_NAMES[route.params.strategy]}</Subheading>
                
                {/* Show a picker if we need to choose long/short for strategy */}
                {screenState.showShortRadio && 
                  <SelectPicker
                    style={{ padding: 0, width: '50%' }}
                    selectedValue={screenState.isShortStrategy ? PositionType.Short : PositionType.Long}
                    onValueChange={newSelection => setScreenState({ 
                      ...screenState, 
                      isShortStrategy: newSelection == PositionType.Short,
                      calculatorInput: {
                        strategy: screenState.calculatorInput.strategy,
                        longCall: screenState.calculatorInput.shortCall,
                        shortCall : screenState.calculatorInput.longCall,
                        longPut: screenState.calculatorInput.shortPut,
                        shortPut: screenState.calculatorInput.longPut
                      }
                    })}
                  >
                    <SelectPicker.Item value={PositionType.Long} label="Long" />
                    <SelectPicker.Item value={PositionType.Short} label="Short" />
                  </SelectPicker>
                }
              </View>
            </View>

            {/* Configure option legs below info cards */}
            <View>
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
                      ...(route.params.strategy == StrategyType.Put && !screenState.isShortStrategy && { longPut: selection }),
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

      <View>
        <HelperText type="error" visible={inputHasError} style={{ textAlign: 'center' }}>
          {inputErrorMessage}
        </HelperText>
        <Button 
          disabled={inputHasError}
          mode="contained" 
          style={Style.nextScreenButton} 
          onPress={() => navigation.push(
            'ViewResultsScreen', {
              calculatorInput: screenState.calculatorInput
            }
          )}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default SelectOptionLegsScreen;