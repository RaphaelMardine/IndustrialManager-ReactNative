import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
interface FabProps {
  onPress?: any;
}

const FabButton: React.FC<FabProps> = ({onPress}) => {
  return (
    <FloatingAction
      animated={false}
      position="center"
      onPressMain={() => onPress()}
    />
  );
}

export default FabButton;