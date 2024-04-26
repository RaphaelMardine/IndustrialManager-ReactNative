import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {
  user as userSvg,
  userWhite,
  param,
  config,
  maps,
} from '../../constants/icons';
import {
  Container,
  Content,
  CardOption,
  UserIcon,
  CardArea,
  Header,
  TextUserName,
  Avatar,
  Icon,
  TextDescription,
} from './styles';
import Main from '../../components/Main';
import {useAuth} from '../../hooks/auth';
import {useNavigation} from '@react-navigation/native';
export function Home() {
  const navigation = useNavigation();
  const {user, signOut} = useAuth();
  console.log(user);

  return (
    <Main hasHeader={false}>
      <Container>
        <Content>
          <Header>
            <UserIcon>
              {user.avatar_url ? (
                <Avatar
                  source={{uri: user.avatar_url}}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                  }}
                />
              ) : (
                <Avatar source={userSvg} />
              )}
            </UserIcon>
            <TextUserName>{user.fullName}</TextUserName>
            <Text>{user.occupation}</Text>
          </Header>
          <CardArea>
            <CardOption onPress={() => navigation.navigate('UserData')}>
              <UserIcon style={{borderColor: 'transparent'}}>
                <Icon source={userWhite} />
              </UserIcon>
              <TextDescription>Meus dados</TextDescription>
            </CardOption>

            <CardOption onPress={() => navigation.navigate('Maps')}>
              {/* <CardOption onPress={() => navigation.navigate('Details')}> */}
              <UserIcon style={{borderColor: 'transparent'}}>
                <Icon source={maps} />
              </UserIcon>

              <TextDescription>Meus Mapas</TextDescription>
            </CardOption>

            <CardOption onPress={() => navigation.navigate('Parameters')}>
              <UserIcon style={{borderColor: 'transparent'}}>
                <Icon source={param} />
              </UserIcon>

              <TextDescription>Meus Parâmetros</TextDescription>
            </CardOption>

            <CardOption
              onPress={() => {
                signOut();
                setTimeout(() => {
                  navigation.navigate('Login');
                }, 1000);
              }}>
              <UserIcon style={{borderColor: 'transparent'}}>
                <Image
                  source={{
                    uri: 'https://s3.amazonaws.com/cdn.vsmanager.app/iconeSVG.png',
                  }}
                  style={{width: 25, height: 25}}
                />
              </UserIcon>

              <TextDescription>Sair do app</TextDescription>
            </CardOption>
          </CardArea>
        </Content>
      </Container>
    </Main>
  );
}
