import React, {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {register} from '../../controllers/Auth.controller';
import {useNavigation} from '@react-navigation/native';
import {Container, Content, Image, ErrorText} from './styles';
import {useTranslation} from 'react-i18next';
import {logoBlue} from '../../constants/images';
import Main from '../../components/Main';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import api from '../../services/api';
import {ActivityIndicator, Alert} from 'react-native';
import {useAuth} from '../../hooks/auth';
import Error from '../../constants/Errors';

export function Signup() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {signIn} = useAuth();
  const signupValidationSchema = yup.object().shape({
    fullName: yup.string().required(t('messages.fullNameRequired')),
    email: yup
      .string()
      .email(t('messages.requiredValidEmail'))
      .required(t('messages.emailRequired')),
    confirmEmail: yup
      .string()
      .email(t('messages.requiredValidConfirmEmail'))
      .required(t('messages.confirmEmailRequired')),
    password: yup
      .string()
      .min(8, ({min}) => t('messages.passwordMin8'))
      .required(t('messages.passwordRequired')),
    confirmPassword: yup
      .string()
      .min(8, ({min}) => t('messages.confirmPasswordMin8'))
      .required(t('messages.confirmPassworRequired')),
    registrationCode: yup
      .string()
      .required('Informe o número de sua inscrição'),
  });

  async function save(data: any) {
    try {
      data.email = data.email.toLowerCase().trim();
      data.confirmEmail = data.confirmEmail.toLowerCase().trim();
      setLoading(true);
      await api.post('/auth/register', data);
      await signIn({
        email: data.email,
        password: data.password,
      });

      Alert.alert(t('messages.success'), t('messages.successRegister'));

      setLoading(false);

      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);

      Error(error.response.data);
    }
  }
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
            validationSchema={signupValidationSchema}
            initialValues={{
              fullName: '',
              email: '',
              confirmEmail: '',
              password: '',
              confirmPassword: '',
              registrationCode: '',
            }}
            onSubmit={values => save(values)}>
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
                  placeholder={t('signup.fullName')}
                  touched={touched}
                  error={errors.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
                {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
                <Input
                  placeholder={t('signup.email')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  touched={touched}
                  error={errors.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                <Input
                  placeholder={t('signup.confirmEmail')}
                  onChangeText={handleChange('confirmEmail')}
                  onBlur={handleBlur('confirmEmail')}
                  value={values.confirmEmail}
                  touched={touched}
                  error={errors.confirmEmail}
                />
                {errors.confirmEmail && (
                  <ErrorText>{errors.confirmEmail}</ErrorText>
                )}
                <Input
                  placeholder={t('signup.password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  touched={touched}
                  error={errors.password}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
                <Input
                  placeholder={t('signup.confirmPassword')}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  touched={touched}
                  error={errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <ErrorText>{errors.confirmPassword}</ErrorText>
                )}
                <Input
                  placeholder={'Inscrição'}
                  onChangeText={handleChange('registrationCode')}
                  onBlur={handleBlur('registrationCode')}
                  value={values.registrationCode}
                  touched={touched}
                  error={errors.registrationCode}
                  keyboardType="phone-pad"
                />
                {errors.registrationCode && (
                  <ErrorText>{errors.registrationCode}</ErrorText>
                )}
                <Button
                  style={{paddingTop: 40}}
                  onPress={handleSubmit}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>{t('signup.createAccount')}</>
                  )}
                </Button>
                <Button
                  style={{paddingTop: 15}}
                  outline
                  onPress={() => navigation.goBack()}>
                  {t('signup.goBack')}
                </Button>
              </>
            )}
          </Formik>
        </Content>
      </Container>
    </Main>
  );
}
