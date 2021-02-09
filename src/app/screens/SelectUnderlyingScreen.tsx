import { gql, useLazyQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, View, Keyboard } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Headline, Subheading, TextInput, Text, Card, Divider, List, Searchbar, ActivityIndicator } from 'react-native-paper';
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
          <Card>
            <Card.Title title={selectionState.symbolSelection.name} />
            <Card.Content>
              <Text>{`${selectionState.symbolSelection.exchange}: ${selectionState.symbolSelection.symbol}`}</Text>
            </Card.Content>
          </Card>
        }
      </View>
      

      <Button
        disabled={!selectionState.symbolSelection}
        mode="contained" 
        onPress={() => navigation.push('SelectStrategyScreen')}>
        Next
      </Button>
    </KeyboardAvoidingView>
  );
};

export default SelectUnderlyingScreen;