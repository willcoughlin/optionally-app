import { useLazyQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, View } from 'react-native';
import { ActivityIndicator, Button, Card, Headline, List, Searchbar, Subheading } from 'react-native-paper';
import UnderlyingSelectionView from '../components/UnderlyingSelectionView';
import { LookupQueryData, LOOKUP_QUERY, UnderlyingPriceQueryData, UNDERLYING_PRICE_QUERY } from '../graphql/queries';
import { LookupResult, QueryLookupArgs, QueryStockArgs, Stock } from '../graphql/types';
import Style from '../style';
import { StackParamList } from '../types';

type SelectUnderlyingScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'SelectUnderlyingScreen'>;
};

type SelectUnderlyingScreenState = {
  symbolInput: string;
  symbolSelection?: LookupResult & Partial<Pick<Stock, 'ask' | 'bid' | 'last'>>;
};

const SelectUnderlyingScreen = ({ navigation }: SelectUnderlyingScreenProps) => {
  // State
  const [selectionState, setSelectionState] = useState<SelectUnderlyingScreenState>({ symbolInput: '' })
  // GQL queries
  const [lookupSymbol, { loading: lookupLoading, error: lookupError, data: lookupData }] = useLazyQuery<LookupQueryData, QueryLookupArgs>(LOOKUP_QUERY);
  const [getPrice, { loading: priceLoading, error: priceError, data: priceData }] = useLazyQuery<UnderlyingPriceQueryData, QueryStockArgs>(UNDERLYING_PRICE_QUERY);

  // On input change, call symbol lookup query
  useEffect(() => {
    if (selectionState.symbolInput.length > 0) {
      lookupSymbol({ variables: { query: selectionState.symbolInput } });
    }
  }, [selectionState.symbolInput]);

  // On symbol selection, look up price
  useEffect(() =>  {
    if (selectionState.symbolSelection && selectionState.symbolSelection.symbol.length > 0) {
      getPrice({ variables: { symbol: selectionState.symbolSelection.symbol } });
    } 
  }, [selectionState.symbolSelection]);

  useEffect(() => {
    if (selectionState.symbolSelection && priceData) {
      setSelectionState({ 
        ...selectionState, 
        symbolSelection: {
          ...selectionState.symbolSelection,
          ask: priceData.stock.ask,
          bid: priceData.stock.bid,
          last: priceData.stock.last
        } 
      })
    }
  }, [priceData])

  return ( 
    <KeyboardAvoidingView style={Style.container}>
      <View>
        <Headline>First things first</Headline>
        <Subheading style={Style.standardTopMargin}>Choose an underlying stock/ETF</Subheading>
        <Searchbar
          placeholder="Symbol"
          value={selectionState.symbolInput}
          onChangeText={text => setSelectionState({ symbolInput: text })}
          clearButtonMode="always" />
        
        {/* If there's typed input and a selection has not been made, show selection list */}
        {selectionState.symbolInput.length > 0 && !selectionState.symbolSelection &&
          <Card
            style={{ maxHeight: '56%' }}>
            <Card.Content>
              {/* If query loading, show indicator */}
              {lookupLoading && <ActivityIndicator animating={true} />}

              {/* If query done loading, show results */}
              {lookupData && 
                <FlatList 
                  data={lookupData.lookup}
                  keyboardShouldPersistTaps="always"
                  keyExtractor={item => item.exchange + item.symbol}
                  renderItem={({ item }) => (
                    <List.Item
                      style={{ padding: 0 }}
                      title={item.name} 
                      description={`${item.exchange}: ${item.symbol}`}
                      onPress={() => {
                        Keyboard.dismiss();
                        setSelectionState({ symbolInput: '', symbolSelection: item }) 
                      }} />
                  )}/>}
            </Card.Content>
          </Card>
        }

        {/* If price loading, show indicator */}
        {priceLoading && <ActivityIndicator style={{ marginTop: 10 }} animating={true} />}

        {/* If price done loading, show selection */}
        {selectionState.symbolSelection && !priceLoading &&
          <UnderlyingSelectionView
            name={selectionState.symbolSelection.name}
            symbol={selectionState.symbolSelection.symbol}
            exchange={selectionState.symbolSelection.exchange}
            ask={selectionState.symbolSelection.ask ?? 0}
            bid={selectionState.symbolSelection.bid ?? 0 }
            last={selectionState.symbolSelection.last ?? 0} />
        }
      </View>
      
      <Button
        disabled={!selectionState.symbolSelection}
        mode="contained" 
        onPress={() => {
          if (selectionState.symbolSelection 
            && selectionState.symbolSelection.ask 
            && selectionState.symbolSelection.bid 
            && selectionState.symbolSelection.last)
          return selectionState.symbolSelection 
            && navigation.push(
              'SelectStrategyScreen', { 
                underlying: {
                  ...selectionState.symbolSelection,
                  ask: selectionState.symbolSelection.ask,
                  bid: selectionState.symbolSelection.bid,
                  last: selectionState.symbolSelection.last
                }
              }
            )
        }}>
        Next
      </Button>
    </KeyboardAvoidingView>
  );
};

export default SelectUnderlyingScreen;