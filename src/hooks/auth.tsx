import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: string;
  fullName: string;
  email: string;
  avatar_url?: string;
  createdAt: string;
  updatedAt: string;
  branchCompany: string;
  company: string;
  course: string;
  dateGraduation: string;
  occupation: string;
  phone: string;
  university: string;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@nuntek:token',
        '@nuntek:user',
      ]);

      if (token[1] && user[1]) {
        if (user[1]) {
          api.defaults.headers.authorization = `Bearer ${token[1]}`;

          setData({token: token[1], user: JSON.parse(user[1])});
          // setData({user: JSON.parse(user[1])});
        }
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    console.log('email', email);
    const response = await api.post('/auth/login', {
      email: email.toLowerCase().trim(),
      password,
    });

    const {user, token} = response.data;
    if (user.avatar) {
      user.avatar_url = user.avatar;
      delete user.avatar;
    }
    // const user = {
    //   "createdAt": "2022-03-29T19:12:20.384Z",
    //   "email": "rodrigo.antunes@webase.me",
    //   "fullName": "Fabiano Nunes",
    //   "id": "62435a140b01fa3db45de2ee",
    //   "phone": "(55) 99968-9085",
    //   "role": "user"
    // }

    await AsyncStorage.multiSet([
      ['@nuntek:token', token.accessToken],
      ['@nuntek:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      user,
      token,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@nuntek:token', '@nuntek:user']);

    setData({
      user: {},
      token: '',
    });
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@nuntek:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{user: data.user, loading, signIn, signOut, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
