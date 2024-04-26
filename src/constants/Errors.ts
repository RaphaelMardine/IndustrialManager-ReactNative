import {Alert} from 'react-native';

function Error(data) {
  console.log(data);
  if (data.code == 409) {
    Alert.alert('Aviso', 'Usuário já cadastrado');
  } else {
    Alert.alert('Aviso', data.message);
  }
}

export default Error;
