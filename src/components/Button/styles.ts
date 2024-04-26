import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 90%;
`;

export const StyledOutlineButton = styled.TouchableOpacity`
  border-color: ${({theme}) => theme.COLORS.PRIMARY_500};
  border-width: 1px;
  border-radius: ${({theme}) => theme.SIZES.BORDER_RADIUS};
  height: ${({theme}) => theme.SIZES.INPUT_HEIGHT};
  align-items: center;
  justify-content: center;
`;

export const ButtonOutlineText = styled.Text`
  color: ${({theme}) => theme.COLORS.PRIMARY_500};
  font-family: ${({theme}) => theme.FONTS.BOLD};
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.COLORS.PRIMARY_500};
  border-radius: ${({theme}) => theme.SIZES.BORDER_RADIUS};
  height: ${({theme}) => theme.SIZES.INPUT_HEIGHT};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: ${({theme}) => theme.FONTS.BOLD};
`;

export const StyledButtonDisabled = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.COLORS.DISABLED};
  border-radius: ${({theme}) => theme.SIZES.BORDER_RADIUS};
  height: ${({theme}) => theme.SIZES.INPUT_HEIGHT};
  align-items: center;
  justify-content: center;
`;

export const StyledButtonDisabledText = styled.Text`
  color: ${({theme}) => theme.COLORS.DARK};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
`;
