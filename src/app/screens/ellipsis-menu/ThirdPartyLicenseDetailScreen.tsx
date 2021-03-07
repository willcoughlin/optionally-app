import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Linking, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import Style from '../../style';
import { EllipsisMenuStackParamList } from './types';

type ThirdPartyLicenseDetailScreenProps = {
  navigation: StackNavigationProp<EllipsisMenuStackParamList, 'ThirdPartyLicenseDetailScreen'>;
  route: RouteProp<EllipsisMenuStackParamList, 'ThirdPartyLicenseDetailScreen'>;
};

const ThirdPartyLicenseDetailScreen = ({ navigation, route }: ThirdPartyLicenseDetailScreenProps) => {
  const thirdPartyItem = route.params.package;
  return (
    <View style={Style.container}>
      <View>
        {'name' in thirdPartyItem &&
          <List.Item
            title="Package Name"
            description={thirdPartyItem.name} />
        }
        <Divider />
        {'version' in thirdPartyItem &&
          <List.Item
            title="Version"
            description={thirdPartyItem.version} />
        }
        <Divider />
        {'publisher' in thirdPartyItem &&
          <List.Item
            title="Publisher"
            description={thirdPartyItem.publisher} />
        }
        <Divider />
        {'copyright' in thirdPartyItem &&
          <List.Item
            title="Copyright"
            description={thirdPartyItem.copyright} />
        }
        <Divider />
        {'licenses' in thirdPartyItem &&
          <List.Item
            title="License Type"
            description={thirdPartyItem.licenses} />
        }
        <Divider />
        {'licenseText' in thirdPartyItem &&
          <List.Item
            title="License Text"
            right={() => <List.Icon icon={() => <Ionicons style={{ paddingTop: 5 }} size={15} name="chevron-forward" />} /> } 
            onPress={() => navigation.push('LicenseTextScreen', { licenseText: thirdPartyItem.licenseText })} />
        }
        <Divider />
        {'repository' in thirdPartyItem &&
          <List.Item
            descriptionStyle={{ fontStyle: 'italic' }}
            title="Repository"
            description="Will open URL in browser"
            right={() => <List.Icon icon={() => <Ionicons style={{ paddingTop: 5 }} size={15} name="open-outline" />} /> }
            onPress={() => Linking.openURL(thirdPartyItem.repository)} />
        }
      </View>
    </View>
  );
};

export default ThirdPartyLicenseDetailScreen;