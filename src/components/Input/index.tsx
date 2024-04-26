import React from 'react';
import {TextInputProps} from 'react-native';
import theme from '../../theme';
import {Container} from './styles';

export function Input({touched, error, ...rest}: TextInputProps) {
  return (
    <Container
      {...rest}
      placeholderTextColor={theme.COLORS.SECONDARY_500}
      style={{
        marginBottom: 10,
        borderColor: !touched
          ? theme.COLORS.SECONDARY_500
          : error
          ? theme.COLORS.DANGER
          : theme.COLORS.SECONDARY_500,
      }}
    />
  );
}
