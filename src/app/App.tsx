import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'OptionAlly' }} />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>  
);

registerRootComponent(App);
export default App;