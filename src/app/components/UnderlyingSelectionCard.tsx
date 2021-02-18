import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { LookupResult, Stock } from '../graphql/types';

export type UnderlyingSelectionCardProps = LookupResult & Pick<Stock, 'ask' | 'bid' | 'last'> & {
  style?: StyleProp<ViewStyle>
};

const UnderlyingSelectionCard = (props: UnderlyingSelectionCardProps) => (
  <Card style={[{ marginTop: 10 }, props.style]}>
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