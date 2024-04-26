import React from 'react';
import './src/locales';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components/native';
import THEME from './src/theme';
import AppProvider from './src/hooks/index';
import {Home} from './src/screens/Home';
import {Login} from './src/screens/Login';
import {Signup} from './src/screens/Signup';
import {ForgotPassword} from './src/screens/ForgotPassword';
import {ResetPassword} from './src/screens/ResetPassword';
import Linking from './src/constants/Linking';
import {UserData} from './src/screens/UserData';
import {Parameters} from './src/screens/Parameters';
import {Maps} from './src/screens/Maps';
import {Details} from './src/screens/Maps/Details';
import {MapsAdd} from './src/screens/Maps/Create';
import {StepsShingo} from './src/screens/Maps/StepsShingo';
import {StepsShingo4} from './src/screens/Maps/StepsShingo4';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer linking={Linking}>
      <AppProvider>
        <ThemeProvider theme={THEME}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'Login'}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="UserData" component={UserData} />
            <Stack.Screen name="Parameters" component={Parameters} />
            <Stack.Screen name="Maps" component={Maps} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Maps/add" component={MapsAdd} />
            <Stack.Screen name="Maps/Shingo" component={StepsShingo} />
            <Stack.Screen name="Maps/Shingo4" component={StepsShingo4} />
          </Stack.Navigator>
        </ThemeProvider>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
