import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Subheading, Title } from 'react-native-paper';
import { PartialOptionsForExpiry } from '../graphql/queries';
import { OptionInput, OptionType } from '../graphql/types';

type OptionSelectorProps = {
  onChangeSelection: (selection: OptionInput) => void;
  optionType: OptionType;
  options: PartialOptionsForExpiry[];
  title?: string;
  buttonText?: string;
};

type OptionSelectorState = {
  selectedDate?: string;
  selection?: OptionInput;
  modalVisible: boolean;
};

const style = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    height: '60%'
  }
});

const OptionSelector = (props: OptionSelectorProps) => {
  const [selectorState, setSelectorState] = useState<OptionSelectorState>({ modalVisible: false });
  
  return (
    <View style={{ marginTop: 10 }}>
      {props.title && <Subheading>{props.title}</Subheading>}
      <Button 
        mode="outlined"
        onPress={() => setSelectorState({ ...selectorState, modalVisible: true })}
      >
        {props.buttonText ?? 'Select Option'}
      </Button>

      <Portal>
        <Modal 
          visible={selectorState.modalVisible} 
          onDismiss={() => setSelectorState({ ...selectorState, modalVisible: false })} 
          contentContainerStyle={style.modal}
        >
          <Title>{props.title ?? 'Select Option'}</Title>
          <Picker
            prompt="Select Expiration Date"
            selectedValue={selectorState.selectedDate}
            onValueChange={dateSelection => setSelectorState({ ...selectorState, selectedDate: dateSelection })}
          >
            {props.options.map(optionsForExpiry => (
              <Picker.Item 
                key={optionsForExpiry.expiry} 
                value={optionsForExpiry.expiry} 
                label={moment(optionsForExpiry.expiry).format('MMM DD, YYYY')} />
            ))}
          </Picker>

          {/* <FlatList
            data={props.options}
            renderItem={({ item }) => (
              <List.Item
                title={item.} />
            )} /> */}
        </Modal>
      </Portal>
    </View>
  );
}

export default OptionSelector;