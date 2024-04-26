import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Container, Content, Image, ErrorText, Title} from './styles';
import {logoBlue} from '../../constants/images';
import Main from '../../components/Main';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {resetPass} from '../../controllers/Auth.controller';
import {useTranslation} from 'react-i18next';

export function ResetPassword({route, navigation}) {
  const {t} = useTranslation();
  const {
    params: {token, email},
  } = route;

  const recoveryValidationSchema = yup.object().shape({
    newPassword: yup
      .string()
      .min(8, ({min}) => t('messages.passwordMin8'))
      .required(t('messages.passwordRequired')),
    confirmNewPassword: yup
      .string()
      .min(8, ({min}) => t('messages.passwordMin8'))
      .required(t('messages.passwordRequired'))
      .equals([yup.ref('newPassword'), t('messages.passwordsMustMatch')]),
  });

  return (
    <Main>
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
        </Content>
        <Title>{t('resetPassword.title')}</Title>
        <Content>
          <Formik
            validationSchema={recoveryValidationSchema}
            initialValues={{
              newPassword: '',
              confirmNewPassword: '',
            }}
            onSubmit={async values => {
              const data = {
                email,
                resetToken: token,
                password: values.newPassword,
              };
              await resetPass(data);
              navigation.navigate('Login');
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
                  placeholder={t('resetPassword.newPassword')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                />
                {errors.newPassword && (
                  <ErrorText>{errors.newPassword}</ErrorText>
                )}
                <Input
                  placeholder={t('resetPassword.confirmNewPassword')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.confirmNewPassword}
                  onChangeText={handleChange('confirmNewPassword')}
                  onBlur={handleBlur('confirmNewPassword')}
                  value={values.confirmNewPassword}
                />
                {errors.confirmNewPassword && (
                  <ErrorText>{errors.confirmNewPassword}</ErrorText>
                )}
                <Button style={{paddingTop: 40}} onPress={handleSubmit}>
                  {t('resetPassword.submit')}
                </Button>
                <Button
                  style={{paddingTop: 15}}
                  outline
                  onPress={() => navigation.navigate('Login')}>
                  {t('resetPassword.back')}
                </Button>
              </>
            )}
          </Formik>
        </Content>
      </Container>
    </Main>
  );
}
