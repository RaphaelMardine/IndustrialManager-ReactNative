import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
`;

export const TextUserName = styled.Text`
  font-size: 24px;
  color: #1c1c1c;
  margin-top: 5px;
  font-family: ${({theme}) => theme.FONTS.BOLD};
`;

export const TextDescription = styled.Text`
  font-size: 14px;
  color: #fff;
  top: 0;
  padding-left: 8px;
  font-family: ${({theme}) => theme.FONTS.REGULAR};
  line-height: 14px;
`;

export const Avatar = styled.Image`
  width: 30px;
  height: 30px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const UserIcon = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-top: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid;
  flex-direction: column;
`;

export const CardOption = styled.TouchableOpacity`
  width: 129px;
  height: 100px;
  border-radius: 10px;
  background-color: #121a91;
  margin: 8px;
  padding: 8px 0;
  flex-direction: column;
`;


export const CardArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
  margin-top: 182px;
`;

export const Header = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 390px;
  height: 115px;
  margin-top: 100px;
  padding-left: 30px;
  flex-direction: column;
`;
