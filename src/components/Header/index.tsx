import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationBar, Icon, IconR} from './styles';
import {arrowLeft, plusIconFab} from '../../constants/icons';

// import { Container } from './styles';

const Header: React.FC = ({children, onLeftPress, onRightPress}) => {
  return (
    <>
      <NavigationBar>
        <TouchableOpacity onPress={() => onLeftPress()} style={{flex: 1}}>
          <Icon source={arrowLeft} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: '#FFF'}}>{children}</Text>
        </View>
        {typeof onRightPress === 'function' ? (
          <TouchableOpacity
            onPress={() => onRightPress()}
            style={{flex: 1, alignItems: 'flex-end'}}>
            <IconR source={plusIconFab} />
          </TouchableOpacity>
        ) : (
          <View style={{flex: 1}} />
        )}
      </NavigationBar>
    </>
  );
};

export default Header;

//view com direcionamento em  linha
//Botao com icone que deve chamar o leftPress
//Title qeu é children
