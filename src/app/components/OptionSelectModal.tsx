import React from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import { PartialOptionsForExpiry } from '../graphql/queries';
import { OptionType } from '../graphql/types';

export type OptionSelectModalProps = {
  visible: boolean;
  dismissAction: () => void;
  optionsChain: PartialOptionsForExpiry[];
  optionType: OptionType;
};

const OptionSelectModal = (props: OptionSelectModalProps) => (
  <Portal>
    <Modal onDismiss={props.dismissAction} visible={props.visible} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
      <Text>{JSON.stringify(props.optionsChain).substring(0, 100)}</Text>
    </Modal>
  </Portal>
);

export default OptionSelectModal;