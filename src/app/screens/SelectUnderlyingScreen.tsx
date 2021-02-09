import { gql, useLazyQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, View } from 'react-native';
import { ActivityIndicator, Button, Card, Headline, List, Searchbar, Subheading, Text } from 'react-native-paper';
import UnderlyingSelectionCard from '../components/UnderlyingSelectionCard';
import { LookupResult, QueryLookupArgs } from '../graphql/types';
import mainStyle from '../styles/main-style';
import { StackParamList } from '../types';

const LOOKUP_QUERY = gql`
  query LookupQuery($query: String!) {
    lookup(query: $query) {
      symbol
      name
      exchange
    }
  }
`;

type LookupQueryData = {
  lookup: LookupResult[];
};

type SelectUnderlyingScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'SelectUnderlyingScreen'>;
};

type SelectUnderlyingScreenState = {
  symbolInput: string;
  symbolSelection?: LookupResult;
};

const SelectUnderlyingScreen = ({ navigation }: SelectUnderlyingScreenProps) => {
  const [selectionState, setSelectionState] = useState<SelectUnderlyingScreenState>({ symbolInput: '' })
  const [lookupSymbol, { loading, error, data }] = useLazyQuery<LookupQueryData, QueryLookupArgs>(LOOKUP_QUERY);

  useEffect(() => {
    if (selectionState.symbolInput.length > 0) {
      lookupSymbol({ variables: { query: selectionState.symbolInput } });
    }
  }, [selectionState.symbolInput]);

  return (  
    <KeyboardAvoidingView style={mainStyle.container}>
      <View>
        <Headline>First things first</Headline>
        <Subheading>Choose an underlying stock/ETF</Subheading>
        <Searchbar 
          placeholder="Symbol"
          value={selectionState.symbolInput}
          onChangeText={text => setSelectionState({ symbolInput: text })}
          clearButtonMode="always" />
        
        {selectionState.symbolInput.length > 0 && !selectionState.symbolSelection &&
          <Card
            style={{ maxHeight: '56%' }}>
            <Card.Content>
              {loading && <ActivityIndicator animating={true} />}
              {data && 
                <FlatList 
                  data={data.lookup}
                  keyboardShouldPersistTaps="always"
                  keyExtractor={(item) => item.exchange + item.symbol}
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
        {selectionState.symbolSelection && 
          <UnderlyingSelectionCard
            name={selectionState.symbolSelection.name}
            symbol={selectionState.symbolSelection.symbol}
            exchange={selectionState.symbolSelection.exchange}
            ask={0}
            bid={0}
            last={0} />
        }
      </View>
      

      <Button
        disabled={!selectionState.symbolSelection}
        mode="contained" 
        onPress={() => {
          return selectionState.symbolSelection 
            && navigation.push(
              'SelectStrategyScreen', 
              { underlying: selectionState.symbolSelection }
            )
        }}>
        Next
      </Button>
    </KeyboardAvoidingView>
  );
};

export default SelectUnderlyingScreen;