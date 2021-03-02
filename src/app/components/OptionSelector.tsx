import { Picker as SelectPicker } from '@react-native-picker/picker';
import moment from 'moment';
import React, { createRef, RefObject, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Caption, List, Modal, Portal, Subheading, Title } from 'react-native-paper';
import { PartialOptionsForExpiry } from '../graphql/queries';
import { Option, OptionInput, OptionType } from '../graphql/types';
import Style from '../style';
import { DeepPartial } from '../types';
import { formatDollarAmount, isoToDisplay } from '../util';

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

  // Set up change selection callback
  useEffect(() => selectorState.selection && props.onChangeSelection(selectorState.selection), [selectorState.selection]);

  // Create ref to list of strikes so we can scroll it programmatically
  const flatlistRef = createRef() as RefObject<FlatList<DeepPartial<Option> | undefined>>;

  return (
    <View style={Style.standardTopMargin}>
      <Title>{props.title}</Title>
      <Subheading>
        {selectorState.selection
            ? `${isoToDisplay(selectorState.selection.expiry)} ${formatDollarAmount(selectorState.selection.strike)} ${props.optionType}`
            : 'None' 
        }
      </Subheading>
      <Button 
        mode="outlined"
        onPress={() => setSelectorState({ 
          ...selectorState, 
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
          <SelectPicker
            prompt="Select Expiration Date"
            selectedValue={selectorState.selectedDate}
            onValueChange={dateSelection => {
              flatlistRef.current?.scrollToOffset({ offset: 0 });
              setSelectorState({ 
                ...selectorState, 
                selectedDate: dateSelection as string,
                optionsForExpiry: props.options.find(it => it.expiry == dateSelection)
              });
            }}
          >
            {props.options.filter(optionsForExpiry => moment(optionsForExpiry.expiry).isSameOrAfter(moment(), 'd')).map(optionsForExpiry => (
              <SelectPicker.Item 
                key={optionsForExpiry.expiry} 
                value={optionsForExpiry.expiry} 
                label={isoToDisplay(optionsForExpiry.expiry)} />
            ))}
          </SelectPicker>

          {selectorState.optionsForExpiry && 
            <FlatList
              ref={flatlistRef}
              data={props.optionType == OptionType.Call ? selectorState.optionsForExpiry.calls : selectorState.optionsForExpiry.puts}
              keyExtractor={item => `${item?.underlyingSymbol}${item?.expiry}${item?.strike}`}
              renderItem={({ item }) => (
                <List.Item 
                  style={{ padding: 0 }}
                  title={`${formatDollarAmount(item?.strike ?? 0)} Strike`} 
                  description={() => (
                    <View style={[Style.flexRowSpaceBetween, { paddingRight: 16 }]}>
                      <Caption>Last: {(item?.last ?? 0).toFixed(2)}</Caption>
                      <Caption>Bid: {(item?.bid ?? 0).toFixed(2)}</Caption>
                      <Caption>Ask: {(item?.ask ?? 0).toFixed(2)}</Caption>
                    </View>
                  )} 
                  onPress={() => {
                    setSelectorState({
                    ...selectorState,
                    modalVisible: false,
                    selection: {
                      currentPrice: (item?.last ?? 0) === 0 
                        ? (item?.ask && item?.bid) ? (item.ask + item.bid / 2) : 0
                        : item?.last ?? 0,
                      expiry: selectorState.selectedDate ?? '',
                      strike: item?.strike ?? 0,
                      underlyingPrice: item?.underlyingPrice ?? 0,
                      underlyingSymbol: item?.underlyingSymbol ?? '',
                      type: item?.type ?? OptionType.Call,
                      quantity: 1
                    }
                    });
                  }} />
              )} />
          }
        </Modal>
      </Portal>
    </View>
  );
}

export default OptionSelector;