import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Caption, Card, Text, Title } from 'react-native-paper';
import { LookupResult, Stock } from '../graphql/types';
import Style from '../style';

/* Related types */
export type UnderlyingSelectionViewProps = LookupResult & Pick<Stock, 'ask' | 'bid' | 'last'> & {
  style?: StyleProp<ViewStyle>
};

/* Component definition */
const UnderlyingSelectionView = (props: UnderlyingSelectionViewProps) => (
  <View style={[Style.standardTopMargin, props.style]}>
    <Title>{props.name}</Title>
    <Caption>{`${props.exchange}: ${props.symbol}`}</Caption>
    {/* <Card.Content> */}
      <View style={Style.flexRowSpaceBetween}>
        <Text>Last: {(props.last ?? 0).toFixed(2)}</Text>
        <Text>Bid: {(props.bid ?? 0).toFixed(2)}</Text>
        <Text>Ask: {(props.ask ?? 0).toFixed(2)}</Text>
      </View>
    {/* </Card.Content> */}
  </View>
);

export default UnderlyingSelectionView;