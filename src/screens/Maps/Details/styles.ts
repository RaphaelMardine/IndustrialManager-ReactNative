import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';


export const CardHeader = styled.View`
  height: 50px;
  flex-direction: column;
  margin-bottom: 90px;
`;
export const CardFooter = styled.View`
  /* height: 150px; */
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