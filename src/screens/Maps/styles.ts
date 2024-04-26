import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: 38px;
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 30px;
`;

export const CardMap = styled.TouchableOpacity`
  border: 1px solid #cacaca;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 10px;
  max-height: 100px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  line-height: 14px;
  margin-top: 7px;
  font-weight: bold;
  color: #1c1c1c;
`;

export const CardDescription = styled.Text`
  font-size: 12px;
  line-height: 12px;
  margin-top: 6px;
  font-weight: bold;
  color: #1c1c1c;
`;

export const CardDescriptionFactory = styled.Text`
  font-size: 10px;
  line-height: 10px;
  font-weight: 400;
  color: #1c1c1c;
  margin-top: 7px;
`;

export const FabArea = styled.View`
  flex: 1;
`;

export const SelectArea = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 30px;
  flex-direction: row;
`;

export const DescriptionText = styled.Text`
  font-size: 14px;
  line-height: 14px;
  margin-top: 7px;
  font-weight: 400;
  color: #1c1c1c;
`;

export const HeadlineText = styled.Text`
  font-size: 24px;
  line-height: 24px;
  font-weight: 700;
  color: #000000;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const PlusIcon = styled.Image`
  height: 9px;
  width: 10px;
  margin-right: 7px;
`;
