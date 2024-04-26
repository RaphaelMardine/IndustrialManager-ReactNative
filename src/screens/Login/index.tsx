import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Container, Content, Image, ForgotText, ErrorText} from './styles';
import {useTranslation} from 'react-i18next';
import {logoBlue} from '../../constants/images';
import {useAuth} from '../../hooks/auth';
import Main from '../../components/Main';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {ActivityIndicator, Alert, TouchableOpacity} from 'react-native';

export function Login({navigation}: any) {
  const {t} = useTranslation();
  const {signIn, user} = useAuth();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     navigation.navigate('Home');
  //   }
  // }, [user]);

  const signinValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('messages.requiredValidEmail'))
      .required(t('messages.emailRequired')),

    password: yup
      .string()
      .min(8, ({min}) => t('messages.passwordMin8'))
      .required(t('messages.passwordRequired')),
  });

  return (
    <Main hasHeader={false}>
      <Container>
        <Content>
          <Image
            source={logoBlue}
            resizeMode="contain"
            animation="pulse"
            delay={100}
            duration={500}
            direction="alternate"
          />

          <Formik
            validationSchema={signinValidationSchema}
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async values => {
              try {
                setLoading(true);
                await signIn({
                  email: values.email,
                  password: values.password,
                });
                setLoading(false);

                navigation.navigate('Home');
              } catch (error) {
                console.log(error);
                setLoading(false);
                Alert.alert(t('messages.warn'), t('login.userNotFound'));
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <Input
                  placeholder={t('login.user')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />

                {errors.email && <ErrorText>{errors.email}</ErrorText>}

                <Input
                  placeholder={t('login.password')}
                  touched={touched}
                  error={errors.password}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                {errors.password && <ErrorText>{errors.password}</ErrorText>}

                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <ForgotText
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    {t('login.forgot')}
                  </ForgotText>
                </TouchableOpacity> */}

                <Button
                  style={{paddingTop: 40}}
                  onPress={handleSubmit}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>{t('login.access')}</>
                  )}
                </Button>
                <Button
                  style={{paddingTop: 15}}
                  outline
                  onPress={() => navigation.navigate('Signup')}>
                  {t('login.createAccount')}
                </Button>
              </>
            )}
          </Formik>
        </Content>
      </Container>
    </Main>
  );
}
