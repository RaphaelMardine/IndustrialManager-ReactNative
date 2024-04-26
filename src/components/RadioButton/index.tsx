import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ICheckbox {
	values: any[]
  row: boolean;
  typeMap(key: any) : void;
}

const RadioButton: React.FC<ICheckbox> = ({values, row, typeMap}) => {
	const [value, setValue] = useState();
  return (
    <>
    
      {row ? (
        <View style={{flexDirection: 'row', marginTop: 20,}}>
          {/* <Text>{this.state.value} </Text> */}
          {values.map(res => {
            return (
              <View key={res.key} style={styles.container, { marginTop: -15}}>
                <TouchableOpacity
                  style={styles.radioCircle}
                  onPress={() => {
                    typeMap(res.key);
                    setValue(res.key)}
                  }
                >
                  {value === res.key && <View style={styles.selectedRb} />}
                </TouchableOpacity>
                <Text style={styles.radioText}>{res.text}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{height: 200}}>
          {/* <Text>{this.state.value} </Text> */}
          {values.map(res => {
            return (
              <View key={res.key} style={styles.container}>
                <TouchableOpacity
                  style={styles.radioCircle}
                  onPress={() => {
                    typeMap(res.key);
                    setValue(res.key)}
                  }
                >
                  {value === res.key && <View style={styles.selectedRb} />}
                </TouchableOpacity>
                <Text style={styles.radioText}>{res.text}</Text>
              </View>
            );
          })}
        </View>
      )}    
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
    top: 50,
  },
  radioText: {
    marginLeft: 5,
    fontSize: 10,
    fontWeight: '700',
  },
	radioCircle: {
    height: 16,
		width: 16,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#121A91',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
    width: 8,
		height: 8,
		borderRadius: 50,
		backgroundColor: '#121A91',
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});

export default RadioButton;