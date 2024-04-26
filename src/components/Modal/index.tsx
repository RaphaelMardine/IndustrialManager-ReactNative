import React from 'react';
import { View, Text } from 'react-native';
import Modal from "react-native-modal";
// import { Container } from './styles';

const ModalApp: React.FC = ({children, isVisible, close}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={() => close()}>
      {children}
    </Modal>
  );
}

export default ModalApp;