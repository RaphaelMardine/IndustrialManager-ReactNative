import React from 'react';

import {Platform, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';

interface PickerProps {
  items: any[];
  selected: any;
  onChange: any;
  enable: any;
}

const PickerApp: React.FC<PickerProps> = ({
  items,
  selected,
  onChange,
  enable,
}) => {
  return (
    <Picker
      enabled={enable}
      style={
        Platform.OS === 'ios'
          ? {
              marginBottom: 100,
              height: 50,
              width: 310,
            }
          : {
              width: 310,
              marginRight: -10,
              marginLeft: -5,
              marginBottom: -10,
              marginTop: -10,
              display: 'flex',
              alignItems: 'center',
              marginRight: -18,
              height: 50,
            }
      }
      mode="dropdown"
      selectedValue={selected}
      onValueChange={(itemValue, itemIndex) => onChange(itemValue, itemIndex)}>
      {items.map((prop, key) => {
        return (
          <Picker.Item
            style={{fontSize: 12}}
            key={key}
            label={prop.label}
            value={prop.value}
          />
        );
      })}
    </Picker>
  );
};

export default PickerApp;
