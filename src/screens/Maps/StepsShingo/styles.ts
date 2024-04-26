import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
`;

export const Content = styled.View`
  flex: 1;
`;

export const CardHeader = styled.View`
  height: 50px;
  flex-direction: column;
  margin-bottom: 90px;
`;
export const CardFooter = styled.View`
  height: 150px;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom:80px;
`;
export const DescriptionText = styled.Text`
  font-size: 12px;
  line-height: 14px;
  margin-top: 7px;
  font-weight: 400;
  color: #1C1C1C;
`;
export const HeadlineText = styled.Text`
  font-size: 24px;
  line-height: 24px;
  font-weight: 700;
  color: #2E294E;
`;
export const HeadlineTextLight = styled.Text`
  font-size: 24px;
  line-height: 24px;
  font-weight: 400;
  color: #2E294E;
`;
export const TextBold = styled.Text`
  font-size: 12px;
  line-height: 24px;
  font-weight: 700;
  color: #000000;
`;
export const TextLight = styled.Text`
  font-size: 10px;
  line-height: 24px;
  font-weight: 400;
  color: #000000;
`;
export const Row = styled.View`
  flex-direction: row;
`;

export const CardOption = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  border: 1px solid #121a91;
  background-color: #fff;
  margin: 0 0 5px 5px;
  padding: 0;
  flex-direction: row;
`;
export const CardArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 310px;
  height: 300px;
  margin-top: 10px;
`;
export const UserIcon = styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid;
  flex-direction: column;
  margin-left: -10px;
`;

export const TextDescription = styled.Text`
  font-size: 13px;
  top: 0;
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  line-height: 14px;
  flex: 1;
  margin-left: -10px;
`;
export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;