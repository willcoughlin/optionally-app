import React, { FunctionComponent } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Button, Headline, ProgressBar, Subheading, TextInput, Title } from 'react-native-paper';
import mainStyle from '../styles/main-style';

const BottomStickyView: FunctionComponent = ({ children }) => (
  <View style={{ 
      position: 'absolute', 
      left: 0,
      right: 0,
      bottom: 0,
      // borderColor: 'black',
      // borderWidth: 1,
      width: '100%',
      margin: 20
    }}>
    {children}
  </View>
);

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
      
      <BottomStickyView>
        <ProgressBar progress={0.5} />
        <Button>
          Next
        </Button>
      </BottomStickyView>
    </View>
  );
};

export default HomeScreen;