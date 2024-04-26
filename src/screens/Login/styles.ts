import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: ${({theme}) => theme.COLORS.DANGER};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
`;

export const Text = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
`;

export const ForgotText = styled.Text`
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.COLORS.SECONDARY_500};
  color: ${({theme}) => theme.COLORS.SECONDARY_500};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  margin-top: 10px;
  margin-left: 20px;
`;

export const Image = styled(Animatable.Image)`
  margin-top: 50px;
  margin-bottom: 50px;
  width: 50px;
  height: 50px;
`;
