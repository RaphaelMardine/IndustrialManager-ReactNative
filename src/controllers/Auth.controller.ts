import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../services/api';
import Error from '../constants/Errors';

async function register(data) {
  const navigation = useNavigation();
  try {
    const response = await api.post('/auth/register', data);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso.');

    navigation.navigate('Home');
  } catch (error) {
    Error(error.response.data);
  }
}

function updateUserData(data, userId) {
  return api.put(`/users/${userId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function forgotPass({email}) {
  // const navigation = useNavigation();
  try {
    const response = await api.post('/auth/send-password-reset', {email});
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso.');

    // navigation.goBack();
  } catch (error) {
    Error(error.response.data);
  }
}

async function resetPass(data) {
  // const navigation = useNavigation();
  try {
    const response = await api.post('/auth/reset-password', data);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso.');

    // navigation.goBack();
  } catch (error) {
    Error(error.response.data);
  }
}

export {register, forgotPass, resetPass, updateUserData};
