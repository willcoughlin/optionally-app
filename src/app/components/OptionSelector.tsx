import React from 'react';
import { View } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import { PartialOptionsForExpiry } from '../graphql/queries';
import { Option, OptionInput, OptionType, StrategyType } from '../graphql/types';

type OptionSelectorProps = {
  onChangeSelection: (selection: OptionInput) => void;
  optionType: OptionType;
  options: PartialOptionsForExpiry[];
  title?: string;
  buttonText?: string;
};

type OptionSelectorState = {
  selection: OptionInput;
};

const OptionSelector = (props: OptionSelectorProps) => (
  <View style={{ marginTop: 10 }}>
    {props.title && <Subheading>{props.title}</Subheading>}
    <Button mode="outlined">
        {props.buttonText ?? 'Select Option'}
      </Button>
  </View>
);

export default OptionSelector;