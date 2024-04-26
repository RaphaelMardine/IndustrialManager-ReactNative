import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const NavigationBar = styled.View`
  width: 100%;
  height: ${getStatusBarHeight() + 38}px;
  background-color: #121a91;
  color: #fff;
  flex-direction: row;
  align-items: center;
  flex: 1;
  position: absolute;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
  top: 0;
  z-index: 10;
`;

export const Icon = styled.Image`
  width: 10px;
  height: 17px;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding-top: 5px;
`;

export const IconR = styled.Image`
  width: 17px;
  height: 17px;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;
  padding-top: 5px;
`;

export const Text = styled.Text`
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding-top: 5px;
`;
