import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Container, Content, Image, ErrorText, Title, SubTitle} from './styles';
import {logoBlue} from '../../constants/images';
import Main from '../../components/Main';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {forgotPass} from '../../controllers/Auth.controller';
import {useTranslation} from 'react-i18next';

export function ForgotPassword({navigation}) {
  const {t} = useTranslation();
  const signinValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('messages.requiredValidEmail'))
      .required(t('messages.emailRequired')),
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
        <Title>{t('forgotPassword.title')}</Title>
        <SubTitle>{t('forgotPassword.subTitle')}</SubTitle>
        <Content>
          <Formik
            validationSchema={signinValidationSchema}
            initialValues={{
              email: '',
            }}
            onSubmit={values => forgotPass(values)}>
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
                  placeholder={t('forgotPassword.user')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                <Button style={{paddingTop: 40}} onPress={handleSubmit}>
                  {t('forgotPassword.submit')}
                </Button>
                <Button
                  style={{paddingTop: 15}}
                  outline
                  onPress={() => navigation.navigate('Login')}>
                  {t('forgotPassword.back')}
                </Button>
              </>
            )}
          </Formik>
        </Content>
      </Container>
    </Main>
  );
}
