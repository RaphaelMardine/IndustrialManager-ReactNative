import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 35px;
`;

export const Avatar = styled.Image`
  height: 50px;
  margin-top: 30px;
`;

export const EditButton = styled.Image`
  height: 17px;
  position: relative;
  margin-left: 120px;
  margin-top: 10px;
`;

export const UserIcon = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  margin-top: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid #121a91;
  flex-direction: column;
  margin-right: 65px;
`;

export const Icon = styled.Image`
  width: 40px;
  height: 40px;
`;

export const Header = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 390px;
  height: 115px;
  margin-top: 70px;
  align-items: center;
  justify-content: center;
`;

export const ForgotText = styled.Text`
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.COLORS.SECONDARY_500};
  color: ${({theme}) => theme.COLORS.SECONDARY_500};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  margin-top: 10px;
  margin-left: 20px;
`;

export const ErrorText = styled.Text`
  color: ${({theme}) => theme.COLORS.DANGER};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
`;

export const TextCategory = styled.Text`
  font-size: 12;
  font-weight: bold;
  color: '1C1C1C';
  line-height: 20;
`;

export const TextLabel = styled.Text`
  font-size: 10px;
  color: 'A8A8A8';
`;
