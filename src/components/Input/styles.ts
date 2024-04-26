import styled from 'styled-components/native';

export const Container = styled.TextInput`
  width: 90%;
  height: 54px;
  padding: 0 16px;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
  color: ${({theme}) => theme.COLORS.TEXT};
  border-radius: ${({theme}) => theme.SIZES.BORDER_RADIUS};
  border-width: ${({theme}) => theme.SIZES.BORDER_WIDTH};
  border-color: ${({theme}) => theme.COLORS.SECONDARY_500};
  height: ${({theme}) => theme.SIZES.INPUT_HEIGHT};
`;
