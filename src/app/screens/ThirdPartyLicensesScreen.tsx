import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import licenses from '../licenses.json';
import Style from '../style';
import { EllipsisMenuStackParamList } from '../types';

type ThirdPartyLicensesScreenProps = {
  navigation: StackNavigationProp<EllipsisMenuStackParamList, 'ThirdPartyLicensesScreen'>;
};

const ThirdPartyLicensesScreen = ({ navigation }: ThirdPartyLicensesScreenProps) => (
  <View style={Style.container}>
    <View style={{ maxHeight: '100%' }}>
      <FlatList 
        // @ts-ignore
        data={Object.keys(licenses).map(key => licenses[key])}
        keyExtractor={item => item.name}
        renderItem={({ item }) =>  (
          <>
            <List.Item 
              title={item.name}
              right={() => <List.Icon icon={() => <Ionicons style={{ paddingTop: 5 }} size={15} name="chevron-forward" />} /> } 
              onPress={() => navigation.push('ThirdPartyLicenseDetailScreen', { package: item })} />
            <Divider />
          </>
        )}
      />
    </View>
  </View>
);

export default ThirdPartyLicensesScreen;