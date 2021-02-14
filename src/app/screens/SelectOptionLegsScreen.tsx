import { useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator, Button, Headline } from 'react-native-paper';
import OptionSelectModal from '../components/OptionSelectModal';
import UnderlyingSelectionCard from '../components/UnderlyingSelectionCard';
import { OptionsChainQueryData, OPTIONS_CHAIN_QUERY, PartialOptionsForExpiry } from '../graphql/queries';
import { OptionType, QueryStockArgs } from '../graphql/types';
import mainStyle from '../styles/main-style';
import { StackParamList } from '../types';

type SelectOptionLegsScreenProps = {
  route: RouteProp<StackParamList, 'SelectOptionLegsScreen'>;
  navigation: StackNavigationProp<StackParamList, 'SelectOptionLegsScreen'>;
};

// type SelectOptionLegsScreenState = {
//   options?: PartialOptionsForExpiry[];
// };

const SelectOptionLegsScreen = ({ route, navigation }: SelectOptionLegsScreenProps) => {
  const strategy = route.params.strategy;

  const [optionSelectVisible, setOptionSelectVisible] = useState<boolean>(true);

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
      </View>

      {optionsChainLoading && <ActivityIndicator animating={true} />}
      {optionsChainData && 
        <OptionSelectModal 
          visible={optionSelectVisible} 
          dismissAction={() => setOptionSelectVisible(false)}
          optionType={OptionType.Call}
          optionsChain={optionsChainData.stock.optionsChain} />
      }

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