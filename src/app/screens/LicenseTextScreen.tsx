import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Style from '../style';
import { EllipsisMenuStackParamList } from '../types';

type LicenseTextScreenProps = {
  route: RouteProp<EllipsisMenuStackParamList, 'LicenseTextScreen'>
};

const LicenseTextScreen = ({ route }: LicenseTextScreenProps) => (
  <View style={Style.container}>
    <ScrollView>
      <Text>{route.params.licenseText}</Text>
    </ScrollView>
  </View>
);

export default LicenseTextScreen;