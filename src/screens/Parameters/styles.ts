import { keyframes } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: 38px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 35px;
  margin-top: 30px;
`;

export const FlowTitle = styled.Text`
  font-size: 14px;
  color: #000000;
  line-height: 14px;
  margin-top: 14px;
  margin-bottom: 14px;
  font-family: ${({theme}) => theme.FONTS.BOLD};
`;

export const EditButton = styled.Image`
  height: 17px;
  position: relative;
  margin-left: 120px;
  margin-top: 10px;
`;

export const PlusIcon = styled.Image`
  color: #121A91;
  background: #121A91;
  height: 9px;
  width: 10px;
  margin-right: 7px;
`;

export const UserIcon = styled.View`
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

export const FlowButton = styled.TouchableOpacity`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
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
  /* text-align: 'left'; */
  /* font-weight: '400'; */
  color: 'A8A8A8';
`;

export const TextModalTitle = styled.Text`
  font-size: 14;
  font-weight: bold;
  color: '1C1C1C';
  line-height: 14;
`;

export const TextModalFlow = styled.Text`
  font-size: 12;

  font-weight: bold;
  color: '1C1C1C';
  line-height: 12;
  margin-top: 6;
  margin-bottom: 20;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 35px;
  margin-top: 30px;
`;

export const ViewModal = styled.View`
  border-radius: 8px;
  height: 100px !important;
  margin-bottom: 130px;
`;

export const ViewModalMap = styled.View`
  border-radius: 8px;
  height: 500px !important;
  margin-bottom: 80px;
`;

export const ChildrenModal = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 30px 30px;
  margin-bottom: 15px;
`;

export const ViewButton = styled.View`
  border-radius: 12px;
`;

export const Badge = styled.TouchableOpacity`
  border-radius: 50px;
  border: 1px solid #e6e3e3;
  padding: 2px;
  align-items: center;
  justify-content: center;
  background-color: #e6e3e3;
  flex: 1;
  margin: 1px;
  font-size: 1px;
  margin-bottom: 12px;
`;

export const BadgeArea = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-right: 30px;
`;

export const TextBadge = styled.Text`
  font-size: 10;
  font-weight: bold;
`;
