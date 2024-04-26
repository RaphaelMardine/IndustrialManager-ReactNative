import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-bottom: 50;
`;

export const Content = styled.View`
  padding-top: 40px;
`;

export const ErrorText = styled.Text`
  color: ${({theme}) => theme.COLORS.DANGER};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
`;

export const TypeMapTitle = styled.Text`
  font-size: 14px;
  color: #000000;
  line-height: 14px;
  margin-top: 14px;
  margin-bottom: 14px;
  font-family: ${({theme}) => theme.FONTS.BOLD};
  position: absolute;
  top:10;
`;
export const TextLabel = styled.Text`
  font-size: 10px;
  color: 'A8A8A8';
  align-items: flex-start !important;
`;
