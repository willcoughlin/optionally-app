import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, StackNavigationProp, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import { IconButton, ProgressBar } from 'react-native-paper';
import Style from '../style';
import { MainStackParamList, RootStackParamList } from '../types';
import SelectOptionLegsScreen from './SelectOptionLegsScreen';
import SelectStrategyScreen from './SelectStrategyScreen';
import SelectUnderlyingScreen from './SelectUnderlyingScreen';
import ViewResultsScreen from './ViewResultsScreen';

const MainStack = createStackNavigator<MainStackParamList>();

type MainStackNavigatorProps = {
  navigation: StackNavigationProp<RootStackParamList, 'MainStackNavigator'>;
};

const MainStackNavigator = ({ navigation }: MainStackNavigatorProps) => (
  <MainStack.Navigator 
    headerMode="float" 
    screenOptions={{ 
      headerStyle: Style.navigationHeader,
      ...TransitionPresets.SlideFromRightIOS,
      headerRight: () => (
        <IconButton 
          size={35} 
          icon={() => <Ionicons size={20} name="ellipsis-vertical" />} 
          onPress={() => navigation.navigate('EllipsisMenuStackNavigator')} />
      )
    }}
  >
    <MainStack.Screen 
      name="SelectUnderlyingScreen" 
      component={SelectUnderlyingScreen} 
      options={{ 
        headerTitle: () => <ProgressBar progress={0} />,
        headerLeft: () => <Image source={require('../../../assets/icon-monochrome.png')} style={{ height: '60%' }} resizeMode="contain" />,
      }} />
    <MainStack.Screen 
      name="SelectStrategyScreen" 
      component={SelectStrategyScreen} 
      options={{ headerTitle: () => <ProgressBar progress={0.25} /> }} />
    <MainStack.Screen 
      name="SelectOptionLegsScreen" 
      component={SelectOptionLegsScreen} 
      options={{ headerTitle: () => <ProgressBar progress={0.51} /> }} />
    <MainStack.Screen 
      name="ViewResultsScreen" 
      component={ViewResultsScreen} 
      options={{ headerTitle: () => <ProgressBar progress={1} /> }} />
  </MainStack.Navigator>
);

export default MainStackNavigator;