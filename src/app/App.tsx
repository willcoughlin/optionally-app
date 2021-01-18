import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import React from 'react';
import 'react-native-gesture-handler';
import { ProgressBar, Provider as PaperProvider } from 'react-native-paper';
import SelectOptionLegsScreen from './screens/SelectOptionLegsScreen';
import SelectStrategyScreen from './screens/SelectStrategyScreen';
import SelectUnderlyingScreen from './screens/SelectUnderlyingScreen';
import { StackParamList } from './types';

const Stack = createStackNavigator<StackParamList>();

const App = () => (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator 
        headerMode="float" 
        screenOptions={{ 
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0
          },
          ...TransitionPresets.SlideFromRightIOS, 
          }}>
        
        <Stack.Screen 
          name="SelectUnderlyingScreen" 
          component={SelectUnderlyingScreen} 
          options={{ headerTitle: () => <ProgressBar style={{marginHorizontal: 56}} progress={0} /> }} 
          />

        <Stack.Screen 
          name="SelectStrategyScreen" 
          component={SelectStrategyScreen} 
          options={{ headerTitle: () => <ProgressBar style={{ marginRight: 56 }} progress={0.25} /> }} 
          />

        <Stack.Screen 
          name="SelectOptionLegsScreen" 
          component={SelectOptionLegsScreen} 
          options={{ headerTitle: () => <ProgressBar style={{ marginRight: 56 }} progress={0.51} /> }} 
          />

        {/* <Stack.Screen 
          name="ResultsScreen" 
          component={ResultsScreen} 
          options={{ headerTitle: () => <ProgressBar style={{ marginRight: 56 }} progress={1} /> }} 
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>  
);

registerRootComponent(App);
export default App;