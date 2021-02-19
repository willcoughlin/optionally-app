import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { LookupResult, Stock } from '../graphql/types';
import Style from '../style';

/* Related types */
export type UnderlyingSelectionCardProps = LookupResult & Pick<Stock, 'ask' | 'bid' | 'last'> & {
  style?: StyleProp<ViewStyle>
};

/* Component definition */
const UnderlyingSelectionCard = (props: UnderlyingSelectionCardProps) => (
  <Card style={[Style.standardTopMargin, props.style]}>
    <Card.Title 
      title={props.name} 
      subtitle={`${props.exchange}: ${props.symbol}`}
      />
    <Card.Content>
      <View style={Style.flexRowSpaceBetween}>
        <Text>Last: {props.last?.toFixed(2)}</Text>
        <Text>Bid: {props.bid?.toFixed(2)}</Text>
        <Text>Ask: {props.ask?.toFixed(2)}</Text>
      </View>
    </Card.Content>
  </Card>
);

export default UnderlyingSelectionCard;