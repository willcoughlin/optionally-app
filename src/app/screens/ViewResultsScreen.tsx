import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import Style from '../style';
import { StackParamList } from '../types';

/* Related types */
type ViewResultsScreenProps = {
  route: RouteProp<StackParamList, 'ViewResultsScreen'>;
  navigation: StackNavigationProp<StackParamList, 'ViewResultsScreen'>;
};

/* Define screen */
const ViewResultsScreen = ({ route, navigation }: ViewResultsScreenProps) => {
  // const { loading, error, data } = useQuery()

  return (
    <View style={[Style.container, { justifyContent: 'flex-start' }]}>
      <Headline>Here are your results</Headline>
    </View>
  );
};

export default ViewResultsScreen;