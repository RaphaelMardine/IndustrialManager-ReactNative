import React, {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Main from '../../../components/Main';
import {useTranslation} from 'react-i18next';
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import HeaderApp from '../../../components/Header';
import api from '../../../services/api';
import {Container, Content, ErrorText, TypeMapTitle, TextLabel} from './styles';
import {Alert, ScrollView, View, ActivityIndicator} from 'react-native';
import RadioButton from '../../../components/RadioButton';
import {Text} from 'react-native-animatable';
import {useAuth} from '../../../hooks/auth';
import Error from '../../../constants/Errors';

const checkboxValues = [
  {
    key: '1',
    text: 'Shingo',
  },
  {
    key: '2',
    text: 'Shingo 4.0',
  },
  // {
  //   key: '3',
  //   text: 'Value Stream Mapping',
  // },
  // {
  //   key: '4',
  //   text: 'Value Stream Mapping 4.0',
  // },
  // {
  //   key: '5',
  //   text: 'Fluxograma',
  // },
];

export function MapsAdd() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {user} = useAuth();
  const [typeMap, setTypeMap] = useState('1');
  const [loading, setLoading] = useState(false);
  const [myText, setMyText] = React.useState('Original Text');

  async function save(data: any) {
    try {
      console.log('=========== :=>', typeMap);
      if (!data.name) {
        Alert.alert('Aviso', 'Informe o nome do mapa');

        return;
      }

      setLoading(true);

      data.mapType = typeMap === '1' ? 'shingo' : 'shingo4.0';
      data.userId = user._id;

      // await AsyncStorage.setItem('@nuntek:maps', JSON.stringify(data));
      const response = await api.post('/maps', data);

      setLoading(false);

      switch (typeMap) {
        case '1':
          navigation.navigate('Maps/Shingo', {id: response.data._id});
          break;

        case '2':
          navigation.navigate('Maps/Shingo4', {id: response.data._id});
          break;

        case '3':
          navigation.navigate('VSM');
          break;

        case '4':
          navigation.navigate('VSM4');
          break;

        case '5':
          navigation.navigate('Fluxograma');
          break;

        default:
          navigation.navigate('Home');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Error(error.response.data);
    }
  }

  return (
    <Main onLeftPress={() => navigation.goBack()} title={t('maps.title')}>
      <Container>
        <Content>
          <ScrollView
            style={{}}
            contentContainerStyle={{
              width: '100%',
              flex: 1,
              justifyContent: 'center',
              marginLeft: 20,
              paddingTop: 30,
            }}>
            <TypeMapTitle>Tipo de Mapa (Obrigatório)</TypeMapTitle>
            <RadioButton
              row={false}
              values={checkboxValues}
              typeMap={type => setTypeMap(type)}
              style={{marginLeft: 0}}
            />
            <Formik
              style={{marginTop: '80px'}}
              initialValues={{
                name: '',
                unit: '',
                factory: '',
                sector: '',
                cell: '',
                machine: '',
                tool: '',
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
                  <TextLabel>{t('maps.name')}</TextLabel>
                  <Input
                    placeholder={t('maps.name')}
                    touched={touched}
                    error={errors.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                  <TextLabel>{t('maps.unit')}</TextLabel>
                  <Input
                    placeholder={t('maps.unit')}
                    touched={touched}
                    error={errors.unit}
                    onChangeText={handleChange('unit')}
                    onBlur={handleBlur('unit')}
                    value={values.unit}
                  />
                  {errors.unit && <ErrorText>{errors.unit}</ErrorText>}

                  <TextLabel>{t('maps.factory')}</TextLabel>
                  <Input
                    placeholder={t('maps.factory')}
                    touched={touched}
                    error={errors.factory}
                    onChangeText={handleChange('factory')}
                    onBlur={handleBlur('factory')}
                    value={values.factory}
                  />
                  {errors.factory && <ErrorText>{errors.factory}</ErrorText>}

                  <TextLabel>{t('maps.sector')}</TextLabel>
                  <Input
                    placeholder={t('maps.sector')}
                    touched={touched}
                    error={errors.sector}
                    onChangeText={handleChange('sector')}
                    onBlur={handleBlur('sector')}
                    value={values.sector}
                  />
                  {errors.sector && <ErrorText>{errors.sector}</ErrorText>}

                  <TextLabel>{t('maps.cell')}</TextLabel>
                  <Input
                    placeholder={t('maps.cell')}
                    touched={touched}
                    error={errors.cell}
                    onChangeText={handleChange('cell')}
                    onBlur={handleBlur('cell')}
                    value={values.cell}
                  />
                  {errors.cell && <ErrorText>{errors.cell}</ErrorText>}

                  <TextLabel>{t('maps.machine')}</TextLabel>
                  <Input
                    placeholder={t('maps.machine')}
                    touched={touched}
                    error={errors.machine}
                    onChangeText={handleChange('machine')}
                    onBlur={handleBlur('machine')}
                    value={values.machine}
                  />
                  {errors.machine && <ErrorText>{errors.machine}</ErrorText>}

                  <TextLabel>{t('maps.tool')}</TextLabel>
                  <Input
                    placeholder={t('maps.tool')}
                    touched={touched}
                    error={errors.tool}
                    onChangeText={handleChange('tool')}
                    onBlur={handleBlur('tool')}
                    value={values.tool}
                  />
                  {errors.tool && <ErrorText>{errors.tool}</ErrorText>}
                  <Button
                    style={{paddingTop: 40}}
                    onPress={handleSubmit}
                    disabled={loading}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>{t('maps.createMap')}</>
                    )}
                  </Button>
                  <Button
                    style={{paddingTop: 15}}
                    outline
                    onPress={() => navigation.goBack()}>
                    {t('maps.cancel')}
                  </Button>
                </>
              )}
            </Formik>
          </ScrollView>
        </Content>
      </Container>
    </Main>
  );
}
