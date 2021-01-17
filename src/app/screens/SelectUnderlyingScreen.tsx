import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Button, Headline, Subheading, TextInput } from 'react-native-paper';
import mainStyle from '../styles/main-style';
import { StackParamList } from '../types';

type SelectUnderlyingScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'SelectUnderlyingScreen'>;
};

const SelectUnderlyingScreen = ({ navigation }: SelectUnderlyingScreenProps) => {
  const [symbolInput, setSymbolInput] = React.useState('');

  return (  
    <View style={mainStyle.container}>
      <Headline>First things first</Headline>
      <Subheading>Choose an underlying stock/ETF</Subheading>
      <TextInput 
        label="Symbol" 
        mode="outlined"
        value={symbolInput}
        onChangeText={text => setSymbolInput(text)} />
      
      <Button 
        mode="contained" 
        style={{ marginTop: 50 }} 
        onPress={() => navigation.navigate('SelectStrategyScreen')}>
        Next
      </Button>
    </View>
  );
};

export default SelectUnderlyingScreen;