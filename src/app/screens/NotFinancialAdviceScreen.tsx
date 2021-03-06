import React from 'react';
import { View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import Style from '../style';

const NotFinancialAdviceScreen = () => (
  <View style={Style.container}>
    <View>
      <Title>Not Financial Advice</Title>
      <Paragraph style={[Style.standardTopMargin, { fontWeight: 'bold' }]}>
        The content of OptionAlly (this app) is not intended as, and shall not be understood or construed as, financial advice.
      </Paragraph>
      <Paragraph style={Style.standardTopMargin}>
        This app is intended to be used and must be used for informational purposes only. It is very important to do your own analysis 
        before making any investment based on your own personal circumstances. While this app may provide general investment education 
        based on your input, you are solely reponsible for evaluating whether any investment is appropriate for your personal objectives. 
        It is expressly recommended that you consult a financial professional for advice regarding your specific situation. 
      </Paragraph>
    </View>
  </View>
);

export default NotFinancialAdviceScreen;