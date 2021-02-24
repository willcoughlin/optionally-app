import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import EllipsisMenuStackNavigator from './screens/EllipsisMenuStackNavigator';
import MainStackNavigator from './screens/MainStackNavigator';
import Variables from './variables';

const RootStack = createStackNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: Variables.serverUrl,
  cache: new InMemoryCache({
    typePolicies: {
      LookupResult: { keyFields: ['symbol', 'exchange'] }
    }
  })
});

const App = () => (
  <ApolloProvider client={client}>
    <PaperProvider>
      <NavigationContainer>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen
            name="MainStackNavigator"
            component={MainStackNavigator} />
          <RootStack.Screen
            name="EllipsisMenuStackNavigator"
            component={EllipsisMenuStackNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>  
  </ApolloProvider>
);

registerRootComponent(App);
export default App;