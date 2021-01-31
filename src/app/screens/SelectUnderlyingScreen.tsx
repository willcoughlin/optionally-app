import { gql, useLazyQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, View, Keyboard } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Headline, Subheading, TextInput, Text, Card, Divider, List } from 'react-native-paper';
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

const SelectUnderlyingScreen = ({ navigation }: SelectUnderlyingScreenProps) => {
  const [symbolInput, setSymbolInput] = React.useState('');
  const [symbolSelection, setSymbolSelection] = React.useState<LookupResult>();
  const [lookupSymbol, { loading, error, data }] = useLazyQuery<LookupQueryData, QueryLookupArgs>(LOOKUP_QUERY);

  useEffect(() => {
    setSymbolSelection(undefined);
    if (symbolInput.length > 0) {
      lookupSymbol({ variables: { query: symbolInput } });
    } else {
    }
  }, [symbolInput]);

  return (  
    <KeyboardAvoidingView style={mainStyle.container}>
      <View>
        <Headline>First things first</Headline>
        <Subheading>Choose an underlying stock/ETF</Subheading>
        <TextInput 
          label="Symbol" 
          mode="outlined"
          value={symbolInput}
          onChangeText={text => setSymbolInput(text)} />
        
        {symbolInput.length > 0 && !symbolSelection &&
          <Card
            style={{ maxHeight: '56%' }}>
            <Card.Content>
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
                        setSymbolSelection(item);
                      }} />
                  )}/>}
            </Card.Content>
          </Card>
        }
      </View>

      <Button
        disabled={!symbolSelection}
        mode="contained" 
        onPress={() => navigation.push('SelectStrategyScreen')}>
        Next
      </Button>
    </KeyboardAvoidingView>
  );
};

export default SelectUnderlyingScreen;