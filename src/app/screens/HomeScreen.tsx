import React from 'react';
import { View } from 'react-native';
import { Headline, Subheading, TextInput } from 'react-native-paper';
import BottomStickyBar from '../components/BottomStickyBar';
import mainStyle from '../styles/main-style';

const HomeScreen = () => {
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
      
      <BottomStickyBar progressBarProgress={0} />
    </View>
  );
};

export default HomeScreen;