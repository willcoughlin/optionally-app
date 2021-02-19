import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import React from 'react';
import { ProgressBar, Provider as PaperProvider } from 'react-native-paper';
import SelectOptionLegsScreen from './screens/SelectOptionLegsScreen';
import SelectStrategyScreen from './screens/SelectStrategyScreen';
import SelectUnderlyingScreen from './screens/SelectUnderlyingScreen';
import Style from './style';
import { StackParamList } from './types';

const Stack = createStackNavigator<StackParamList>();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.1.106:3000/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          headerMode="float" 
          screenOptions={{ 
            headerStyle: Style.navigationHeader,
            ...TransitionPresets.SlideFromRightIOS, 
            }}>
          
          <Stack.Screen 
            name="SelectUnderlyingScreen" 
            component={SelectUnderlyingScreen} 
            options={{ headerTitle: () => <ProgressBar style={[Style.navigationProgressBar, { marginLeft: 56 }]} progress={0} /> }} 
            />

          <Stack.Screen 
            name="SelectStrategyScreen" 
            component={SelectStrategyScreen} 
            options={{ headerTitle: () => <ProgressBar style={Style.navigationProgressBar} progress={0.25} /> }} 
            />

          <Stack.Screen 
            name="SelectOptionLegsScreen" 
            component={SelectOptionLegsScreen} 
            options={{ headerTitle: () => <ProgressBar style={Style.navigationProgressBar} progress={0.51} /> }} 
            />

          {/* <Stack.Screen 
            name="ResultsScreen" 
            component={ResultsScreen} 
            options={{ headerTitle: () => <ProgressBar style={Style.navigationProgressBar} progress={1} /> }} 
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>  
  </ApolloProvider>
);

registerRootComponent(App);
export default App;