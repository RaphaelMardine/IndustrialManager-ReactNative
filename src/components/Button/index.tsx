import React from 'react';
import {} from 'react-native';

import {
  Container,
  StyledButton,
  ButtonText,
  StyledOutlineButton,
  ButtonOutlineText,
  StyledButtonDisabled,
  StyledButtonDisabledText,
} from './styles';

export function Button({children, outline, style, btnStyle, disabled, ...rest}) {
  return (
    <>
      {outline ? (
        <Container style={style}>
          <StyledOutlineButton {...rest}>
            <ButtonOutlineText>{children}</ButtonOutlineText>
          </StyledOutlineButton>
        </Container>
      ) : disabled ? (
        <Container style={style}>
          <StyledButtonDisabled {...rest}>
            <StyledButtonDisabledText>{children}</StyledButtonDisabledText>
          </StyledButtonDisabled>
        </Container>
      ) : (
        <Container style={style}>
          <StyledButton {...rest} style={btnStyle && {backgroundColor: btnStyle.backgroundColor}}>
            <ButtonText style={btnStyle && {color: btnStyle.color}}>{children}</ButtonText>
          </StyledButton>
        </Container>
      )}
    </>
  );
}
