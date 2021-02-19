import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import React, { createRef, RefObject, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Caption, List, Modal, Portal, Subheading, Title } from 'react-native-paper';
import { PartialOptionsForExpiry } from '../graphql/queries';
import { Option, OptionInput, OptionType } from '../graphql/types';
import Style from '../style';
import { DeepPartial } from '../types';

/* Related types */
type OptionSelectorProps = {
  onChangeSelection: (selection: OptionInput) => void;
  optionType: OptionType;
  options: PartialOptionsForExpiry[];
  title: string;
  buttonText?: string;
};

type OptionSelectorState = {
  modalVisible: boolean;
  selectedDate?: string;
  optionsForExpiry?: PartialOptionsForExpiry;
  selection?: OptionInput;
};

/* Style */
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
  // Set default state
  const [selectorState, setSelectorState] = useState<OptionSelectorState>({ 
    modalVisible: false,
    selectedDate: props.options[0].expiry,
    optionsForExpiry: props.options[0]
  });

  // Create ref to list of strikes so we can scroll it programmatically
  const flatlistRef = createRef() as RefObject<FlatList<DeepPartial<Option> | undefined>>;

  return (
    <View style={Style.standardTopMargin}>
      <Title>{props.title}</Title>
      <Subheading>
        {selectorState.selection
            ? `${moment(selectorState.selection.expiry).format('MMM DD, YYYY')} $${selectorState.selection.strike.toFixed(2)} ${props.optionType}`
            : 'None' 
        }
      </Subheading>
      <Button 
        mode="outlined"
        onPress={() => setSelectorState({ 
          ...selectorState, 
          selectedDate: props.options[0].expiry,
          optionsForExpiry: props.options[0],
          modalVisible: true 
        })}
      >
        {selectorState.selection ? 'Change Selection' : 'Select Option'}
      </Button>

      {/* Contain selection modal within Portal */}
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
            onValueChange={dateSelection => {
              flatlistRef.current?.scrollToOffset({ offset: 0 });
              setSelectorState({ 
                ...selectorState, 
                selectedDate: dateSelection,
                optionsForExpiry: props.options.find(it => it.expiry == dateSelection)
              });
            }}
          >
            {props.options.map(optionsForExpiry => (
              <Picker.Item 
                key={optionsForExpiry.expiry} 
                value={optionsForExpiry.expiry} 
                label={moment(optionsForExpiry.expiry).format('MMM DD, YYYY')} />
            ))}
          </Picker>

          {selectorState.optionsForExpiry && 
            <FlatList
              ref={flatlistRef}
              data={props.optionType == OptionType.Call ? selectorState.optionsForExpiry.calls : selectorState.optionsForExpiry.puts}
              keyExtractor={item => `${item?.underlyingSymbol}${item?.expiry}${item?.strike}`}
              renderItem={({ item }) => (
                <List.Item 
                  style={{ padding: 0 }}
                  title={`$${item?.strike?.toFixed(2)} Strike`} 
                  description={() => (
                    <View style={[Style.flexRowSpaceBetween, { paddingRight: 16 }]}>
                      <Caption>Last: {item?.last?.toFixed(2)}</Caption>
                      <Caption>Bid: {item?.bid?.toFixed(2)}</Caption>
                      <Caption>Ask: {item?.ask?.toFixed(2)}</Caption>
                    </View>
                  )} 
                  onPress={() => setSelectorState({
                    ...selectorState,
                    selectedDate: undefined,
                    optionsForExpiry: undefined,
                    modalVisible: false,
                    selection: {
                      currentPrice: item?.last ?? 0,
                      expiry: selectorState.selectedDate ?? '',
                      quantity: 1,
                      strike: item?.strike ?? 0
                    }
                  })} />
              )} />
          }
        </Modal>
      </Portal>
    </View>
  );
}

export default OptionSelector;