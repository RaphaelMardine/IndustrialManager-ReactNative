import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  Header,
  Avatar,
  UserIcon,
  ErrorText,
  TextCategory,
  TextLabel,
  EditButton,
} from './styles';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Main from '../../components/Main';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import HeaderApp from '../../components/Header';
import {user, editIcon} from '../../constants/icons';
import {updateUserData} from '../../controllers/Auth.controller';
import {useAuth} from '../../hooks/auth';
import {ActivityIndicator, Alert, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import api from '../../services/api';
let userImg = user;

export function UserData() {
  const {t} = useTranslation();
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user: userData, updateUser, signOut} = useAuth();

  const navigation = useNavigation();
  const userDataValidationSchema = yup.object().shape({
    fullName: yup.string().required(t('messages.requiredFullName')),
    email: yup
      .string()
      .email(t('messages.requiredValidEmail'))
      .required(t('messages.emailRequired')),
    phone: yup
      .string()
      .required(t('messages.requiredPhone'))
      .matches(
        /^\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$/,
        t('messages.requiredValidPhone'),
      ),
    university: yup.string().required(t('messages.requiredUniversity')),
    course: yup.string().required(t('messages.requiredCourse')),
    dateGraduation: yup.string().required(t('messages.requiredDateGraduation')),
    company: yup.string().required(t('messages.requiredCompany')),
    branchCompany: yup.string().required(t('messages.requiredBranchCompany')),
    occupation: yup.string().required(t('messages.requiredOccupation')),
  });

  useEffect(() => {
    if (userData.avatar_url) {
      setAvatar(userData.avatar_url);
    }
  }, [userData]);

  function openModalCameraRoll() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setAvatar(image.path);
    });
  }

  async function deleteUser(id) {
    try {
      setLoading(true);
      await api.delete(`/users/${id}`);
      signOut();
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
      Alert.alert('Aviso', 'Não foi possivel deletar o usuário');
    }
  }

  return (
    <Main onLeftPress={() => navigation.goBack()} title={t('userData.data')}>
      <Container>
        <Content>
          <Header>
            <UserIcon onPress={() => openModalCameraRoll()}>
              <Avatar
                source={avatar ? {uri: avatar} : userImg}
                style={
                  avatar && {
                    width: 95,
                    height: 95,
                    borderRadius: 50,
                    marginTop: 27,
                  }
                }
              />
              <EditButton source={editIcon} />
            </UserIcon>
          </Header>
          <Formik
            // validationSchema={userDataValidationSchema}
            initialValues={{
              fullName: userData.fullName,
              email: userData.email,
              phone: userData.phone,
              university: userData.university,
              course: userData.course,
              dateGraduation: userData.dateGraduation,
              company: userData.company,
              branchCompany: userData.branchCompany,
              occupation: userData.occupation,
            }}
            onSubmit={async values => {
              const formData = new FormData();
              formData.append('fullName', values.fullName);
              formData.append('email', values.email);
              formData.append('phone', values.phone);
              formData.append('university', values.university);
              formData.append('course', values.course);
              formData.append('dateGraduation', values.dateGraduation);
              formData.append('company', values.company);
              formData.append('branchCompany', values.branchCompany);
              formData.append('occupation', values.occupation);
              if (avatar) {
                formData.append('file', {
                  uri: avatar,
                  name: 'image.jpeg',
                  type: 'image/jpeg',
                });
              }

              console.log(userData);

              const response = await updateUserData(formData, userData._id);
              updateUser({
                ...values,
                avatar_url: response.data.avatar,
                id: userData._id,
              });
              navigation.navigate('Home');
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
                <TextCategory>{t('userData.profile')}</TextCategory>
                <TextLabel>{t('userData.userName')}</TextLabel>
                <Input
                  placeholder={t('userData.userName')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
                {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
                <TextLabel>E-mail</TextLabel>

                <Input
                  placeholder={t('userData.email')}
                  touched={touched}
                  error={errors.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}

                <TextLabel>{t('userData.phone')}</TextLabel>

                <Input
                  placeholder={t('userData.phone')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}

                <TextCategory>{t('userData.graduation')}</TextCategory>

                <TextLabel>{t('userData.university')}</TextLabel>

                <Input
                  placeholder={t('userData.university')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.university}
                  onChangeText={handleChange('university')}
                  onBlur={handleBlur('university')}
                  value={values.university}
                />
                {errors.university && (
                  <ErrorText>{errors.university}</ErrorText>
                )}

                <TextLabel>{t('userData.course')}</TextLabel>

                <Input
                  placeholder={t('userData.course')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.course}
                  onChangeText={handleChange('course')}
                  onBlur={handleBlur('course')}
                  value={values.course}
                />
                {errors.course && <ErrorText>{errors.course}</ErrorText>}

                <TextLabel>{t('userData.dateGraduation')}</TextLabel>

                <Input
                  placeholder={t('userData.dateGraduation')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.dateGraduation}
                  onChangeText={handleChange('dateGraduation')}
                  onBlur={handleBlur('dateGraduation')}
                  value={values.dateGraduation}
                />
                {errors.dateGraduation && (
                  <ErrorText>{errors.dateGraduation}</ErrorText>
                )}

                <TextCategory>{t('userData.occupation')}</TextCategory>

                <TextLabel>{t('userData.company')}</TextLabel>

                <Input
                  placeholder={t('userData.company')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.company}
                  onChangeText={handleChange('company')}
                  onBlur={handleBlur('company')}
                  value={values.company}
                />
                {errors.company && <ErrorText>{errors.company}</ErrorText>}

                <TextLabel>{t('userData.branchCompany')}</TextLabel>

                <Input
                  placeholder={t('userData.branchCompany')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.branchCompany}
                  onChangeText={handleChange('branchCompany')}
                  onBlur={handleBlur('branchCompany')}
                  value={values.branchCompany}
                />
                {errors.branchCompany && (
                  <ErrorText>{errors.branchCompany}</ErrorText>
                )}

                <TextLabel>{t('userData.occupation')}</TextLabel>

                <Input
                  placeholder={t('userData.occupation')}
                  style={{marginBottom: 10}}
                  touched={touched}
                  error={errors.occupation}
                  onChangeText={handleChange('occupation')}
                  onBlur={handleBlur('occupation')}
                  value={values.occupation}
                />
                {errors.occupation && (
                  <ErrorText>{errors.occupation}</ErrorText>
                )}

                <Button style={{paddingTop: 40}} onPress={handleSubmit}>
                  {t('userData.changes')}
                </Button>
                <Button
                  style={{paddingTop: 15}}
                  outline
                  disabled={loading}
                  onPress={() => {
                    Alert.alert(
                      'Atenção',
                      'Tem certeza que deseja excluir permanentemente sua conta?',
                      [
                        {
                          text: 'Cancelar',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Sim, excluir agora',
                          onPress: () => deleteUser(user._id),
                        },
                        ,
                      ],
                    );
                  }}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>Apagar conta</>
                  )}
                </Button>
              </>
            )}
          </Formik>
        </Content>
      </Container>
    </Main>
  );
}
