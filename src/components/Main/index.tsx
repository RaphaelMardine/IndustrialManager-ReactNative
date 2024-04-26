import React from 'react';
import {ScrollView, StatusBar, Text} from 'react-native';
import theme from '../../theme';
import { Title } from '../Card/styles';
import HeaderApp from '../Header';

interface IMain {
  children: any;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  title?: string;
  hasHeader?: boolean;
}

const Main: React.FC<IMain> = ({children, onLeftPress, onRightPress, title, hasHeader = true}) => {
  return (
    <>
      {
        hasHeader && <HeaderApp
          style={{flex:'1'}}
          onRightPress={typeof onRightPress === "function" ? () => onRightPress() : {}}
          onLeftPress={() => onLeftPress()}
        >
          {title}
        </HeaderApp>
      }
      <ScrollView
        key='key'
        style={{backgroundColor: theme.COLORS.BACKGROUND}}
        contentInsetAdjustmentBehavior="automatic">
        <StatusBar barStyle={'light-content'} backgroundColor={theme.COLORS.GRADIENT_END} />
        {children}
      </ScrollView>
    </>
  );
};

export default Main;
