import React from 'react';
import { LookupResult, Stock } from '../graphql/types';
import { Caption, Card, Text } from 'react-native-paper';
import { View } from 'react-native';

export type UnderlyingSelectionCardProps = LookupResult & Pick<Stock, 'ask' | 'bid' | 'last'>;

const UnderlyingSelectionCard = (props: UnderlyingSelectionCardProps) => (
  <Card style={{ marginTop: 10 }}>
    <Card.Title 
      title={props.name} 
      subtitle={`${props.exchange}: ${props.symbol}`}
      />
    <Card.Content>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Last: {(props.last ?? 0).toFixed(2)}</Text>
        <Text>Bid: {(props.bid ?? 0).toFixed(2)}</Text>
        <Text>Ask: {(props.ask ?? 0).toFixed(2)}</Text>
      </View>
    </Card.Content>
  </Card>
);

export default UnderlyingSelectionCard;