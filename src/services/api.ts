import axios from 'axios';
import {Platform} from 'react-native';

const isProduction = false;

const api = axios.create({
  baseURL: isProduction
    ? 'https://api.vsmanager.app/v1'
    : Platform.OS === 'ios'
    ? 'http://localhost:3001/v1'
    : 'http://10.0.2.2:3001/v1',
});

export default api;
