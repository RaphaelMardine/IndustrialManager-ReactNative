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

export const Title = styled.Text`
  font-size: 24px;
  color: ${({theme}) => theme.COLORS.DARK};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  margin-left: 20px;
  margin-bottom: 8px;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.COLORS.DARK};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  margin-left: 20px;
  margin-bottom: 50px;
`;

export const Image = styled(Animatable.Image)`
  margin-top: 50px;
  margin-bottom: 50px;
  width: 50px;
  height: 50px;
`;
