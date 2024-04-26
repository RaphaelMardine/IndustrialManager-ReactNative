import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {Formik} from 'formik';
import {Stopwatch} from 'react-native-stopwatch-timer';
import {getDistance, getPreciseDistance} from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import {
  materiaPrima,
  inspecao,
  deslocamento,
  esperalote,
  processamento,
  naoAgregacao,
  esperaProcessamento,
  estoqueSemiacabado,
} from '../../../constants/icons';
import {Container, Content} from './styles';
import {
  HeadlineText,
  HeadlineTextLight,
  CardOption,
  UserIcon,
  CardArea,
  Icon,
  TextDescription,
} from './styles';
import HeaderApp from '../../../components/Header';
import {Button} from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import Main from '../../../components/Main';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Input} from '../../../components/Input';
// import PickerApp from '../../../components/Picker';
import {useAuth} from '../../../hooks/auth';
import api from '../../../services/api';
import theme from '../../../theme';

export function StepsShingo() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {user} = useAuth();
  const route = useRoute();
  const [stop, setStop] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [startLatLng, setStartLatLng] = useState({latitude: '', longitude: ''});
  const [endLatLng, setEndLatLng] = useState({latitude: '', longitude: ''});
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [stepName, setStepName] = useState();
  const [selectedtypeMap, setSelectedtypeMap] = useState(null);
  const [loteLength, setLoteLength] = useState(null);
  const [maps, setMaps] = useState({});
  const [selectedStepMap, setSelectedStepMap] = useState(1);
  const [enablePicker, setEnablePicker] = useState(true);
  const [selectedButton, setSelectedButton] = useState('');
  const [isStep, setIsStep] = useState('');
  const [selectedTypeStep, setSelectedTypeStep] = useState(null);
  console.log(selectedStepMap);
  const [typeMapAux] = useState([
    {
      label: 'Selecione',
      value: null,
    },
    {
      label: 'Não agregação de valor',
      value: 2,
    },
    {
      label: 'Inspeção',
      value: 3,
    },
    {
      label: 'Espera por lote',
      value: 4,
    },
    {
      label: 'Transporte',
      value: 5,
    },
    {
      label: 'Espera de processamento',
      value: 6,
    },
    {
      label: 'Processamento',
      value: 7,
    },
  ]);
  const [typeMap] = useState([
    {
      label: 'Selecione',
      value: null,
    },
    {
      label: 'Estoque de matéria prima',
      value: 1,
    },
    {
      label: 'Não agregação de valor',
      value: 2,
    },
    {
      label: 'Inspeção',
      value: 3,
    },
    {
      label: 'Espera por lote',
      value: 4,
    },
    {
      label: 'Transporte',
      value: 5,
    },
    {
      label: 'Espera de processamento',
      value: 6,
    },
    {
      label: 'Processamento',
      value: 7,
    },
  ]);

  const [typeStep] = useState([
    {
      label: 'Nova etapa',
      value: 0,
    },
    {
      label: 'Passo 1',
      value: 1,
    },
    {
      label: 'Passo 2',
      value: 2,
    },
    {
      label: 'Passo 3',
      value: 3,
    },
    {
      label: 'Passo4',
      value: 4,
    },
    {
      label: 'Passo 5 espera',
      value: 5,
    },
  ]);
  const {params} = route;
  function getLocation(isStart = false) {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        console.log('COORDS');
        console.log(position.coords);

        //Setting Longitude state
        if (isStart) {
          setStartLatLng({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } else {
          setEndLatLng({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        // getLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    getLocation();
  }, []);

  useEffect(() => {
    // requestPermission();
    getSteps();
    getMaps();
  }, []);

  async function getMaps() {
    try {
      const maps = await api.get(`/maps/${params.id}`);
      console.log('SS', maps.data[0]);

      setMaps(maps.data[0]);
    } catch (err) {
      alert('Não foi possível carregar os mapas');
    }
  }

  async function getLocalMaps() {
    let map = await AsyncStorage.getItem('@nuntek:maps');
    map = JSON.parse(map);
    if (!map.steps) {
      setSelectedtypeMap(1);
    }
    setMaps(map);
  }

  function nextStep() {
    endStep(false);
    setResetStopwatch(true);
    setIsStopwatchStart(false);

    setStepName(null);
    setSelectedtypeMap(null);
    setTime(0);
    setStop(false);
    setTimerOn(false);
    setLoteLength(null);
    setSelectedButton('');
  }

  const itemDrop = [
    {
      icon: materiaPrima,
    },
    {
      icon: naoAgregacao,
    },
    {
      icon: inspecao,
    },
    {
      icon: esperalote,
    },
    {
      icon: deslocamento,
    },
    {
      icon: esperaProcessamento,
    },
    {
      icon: processamento,
    },
    {
      icon: estoqueSemiacabado,
    },
  ];

  async function endStep(navigate = true) {
    const newJson = maps;
    if (!newJson.steps) {
      newJson.steps = [];
    }

    const distance = calculatePreciseDistance();

    const stepValues = {
      time,
      name: stepName,
      selectedtypeMap,
      loteLength,
      distance,
    };

    console.log(stepValues, params);

    await api.post(`/stepFlow/${params.id}`, stepValues);

    newJson.steps.push(stepValues);

    setMaps(newJson);

    if (navigate) {
      navigation.navigate('Details');
    }
  }

  function validate() {
    if (!stepName) {
      return true;
    }

    if (!selectedtypeMap) {
      return true;
    }

    return false;
  }

  function calculatePreciseDistance() {
    return getPreciseDistance(startLatLng, endLatLng);
  }

  function selectOption(item) {
    getLocation(true);
    setIsStopwatchStart(!isStopwatchStart);
    setResetStopwatch(false);

    setSelectedButton(item);
  }

  async function getSteps() {
    const step = await api.get('/params?paramType=stepFlow');
    setIsStep(step);
  }
  return (
    <Main
      onLeftPress={() => navigation.goBack()}
      title={t('maps.title')}
      style={{backgroundColor: '#fafafa'}}>
      <Container
        style={{backgroundColor: '#fafafa', marginTop: 15, marginBottom: 100}}>
        <Content
          style={{height: Dimensions.get('window').height, paddingLeft: 30}}>
          <HeadlineText style={{marginTop: 30}}>{maps.name}</HeadlineText>
          <HeadlineTextLight>Mapa de Shingo</HeadlineTextLight>
          <View
            style={{
              marginTop: 30,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#CACACA',
              elevation: 3,
              width: '90%',
              height: '47%',
              marginLeft: 5,
              borderRadius: 8,
              alignItems: 'center',
              paddingTop: 15,
            }}>
            <>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 40,
                }}>
                {selectedtypeMap && (
                  <Image
                    source={
                      itemDrop[selectedtypeMap - 1] &&
                      itemDrop[selectedtypeMap - 1].icon
                    }
                  />
                )}
              </View>
              {/* {isStep != '' ?
             <View style={{width: '90%', borderRadius: 8, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', height: 35, marginBottom: 10}}>
             <PickerApp
                items={typeStep}
                selected={selectedStepMap}
                onChange={(value: any) => setSelectedStepMap(value)}
              />
              </View>
               :
              <Input
                placeholder={t('maps.stepName')}
                onChangeText={(text) => setStepName(text)}
                value={stepName}
              /> } */}
              <Input
                placeholder={t('maps.stepName')}
                onChangeText={text => setStepName(text)}
                value={stepName}
              />
              {selectedStepMap === 0 ? (
                <Input
                  placeholder={t('maps.stepNew')}
                  onChangeText={text => setStepName(text)}
                  value={stepName}
                />
              ) : null}
              <Input
                keyboardType="phone-pad"
                placeholder={'Tamanho do lote'}
                onChangeText={text => setLoteLength(text)}
                value={loteLength}
              />
              <TextDescription>{t('maps.stepType')}</TextDescription>
              <CardArea>
                <CardOption
                  disabled={isStopwatchStart}
                  style={
                    selectedButton === 'Inspeção' && {
                      backgroundColor: '#0A17E5',
                    }
                  }
                  onPress={() => {
                    setSelectedtypeMap(3);
                    selectOption('Inspeção');
                  }}>
                  <UserIcon style={{borderColor: 'transparent'}}>
                    <Icon source={inspecao} />
                  </UserIcon>
                  <TextDescription>Inspeção</TextDescription>
                </CardOption>

                <CardOption
                  disabled={isStopwatchStart}
                  style={
                    selectedButton === 'Deslocamento' && {
                      backgroundColor: '#0A17E5',
                    }
                  }
                  onPress={() => {
                    setSelectedtypeMap(5);
                    selectOption('Deslocamento');
                  }}>
                  <UserIcon style={{borderColor: 'transparent'}}>
                    <Icon source={deslocamento} />
                  </UserIcon>

                  <TextDescription>Deslocamento</TextDescription>
                </CardOption>

                <CardOption
                  disabled={isStopwatchStart}
                  style={
                    selectedButton === 'Processamento' && {
                      backgroundColor: '#0A17E5',
                    }
                  }
                  onPress={() => {
                    setSelectedtypeMap(7);
                    selectOption('Processamento');
                  }}>
                  <UserIcon style={{borderColor: 'transparent'}}>
                    <Icon source={processamento} />
                  </UserIcon>

                  <TextDescription>Processamento</TextDescription>
                </CardOption>

                <CardOption
                  disabled={isStopwatchStart}
                  style={
                    selectedButton === 'Espera de Lotes' && {
                      backgroundColor: '#0A17E5',
                    }
                  }
                  onPress={() => {
                    setSelectedtypeMap(4);
                    selectOption('Espera de Lotes');
                  }}>
                  <UserIcon style={{borderColor: 'transparent'}}>
                    <Icon source={esperalote} />
                  </UserIcon>

                  <TextDescription>Espera de Lotes</TextDescription>
                </CardOption>

                <CardOption
                  disabled={isStopwatchStart}
                  style={
                    selectedButton === 'Espera de Processamento' && {
                      backgroundColor: '#0A17E5',
                    }
                  }
                  onPress={() => {
                    setSelectedtypeMap(6);
                    selectOption('Espera de Processamento');
                  }}>
                  <UserIcon style={{borderColor: 'transparent'}}>
                    <Icon source={esperaProcessamento} />
                  </UserIcon>

                  <TextDescription>Espera de Processamento</TextDescription>
                </CardOption>

                <CardOption
                  disabled={isStopwatchStart}
                  style={
                    selectedButton === 'Não agregação de valor necessária' && {
                      backgroundColor: '#0A17E5',
                    }
                  }
                  onPress={() => {
                    setSelectedtypeMap(2);
                    selectOption('Não agregação de valor necessária');
                  }}>
                  <UserIcon style={{borderColor: 'transparent'}}>
                    <Icon source={naoAgregacao} />
                  </UserIcon>

                  <TextDescription>
                    Não agregação de valor necessária
                  </TextDescription>
                </CardOption>
              </CardArea>
            </>
          </View>
          <View
            style={{alignItems: 'center', marginRight: 35, marginVertical: 15}}>
            <Stopwatch
              start={isStopwatchStart}
              reset={resetStopwatch}
              options={{
                container: {
                  backgroundColor: '#fafafa',
                  padding: 5,
                  borderRadius: 5,
                },
                text: {
                  fontSize: 30,
                  color: '#000',
                  marginLeft: 7,
                },
              }}
              getTime={time => {
                setTime(time);
              }}
            />
          </View>
          <View>
            {isStopwatchStart && (
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: '#FF0707',
                  width: '90%',
                  borderRadius: 8,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  getLocation();
                  setIsStopwatchStart(!isStopwatchStart);
                  setResetStopwatch(false);
                  setStop(true);
                }}>
                <Text style={{color: '#FFF'}}>Pausar etapa</Text>
              </TouchableOpacity>
              // <Button
              //   btnStyle={{backgroundColor: '#FF0707', color: '#fff'}}
              //   onPress={() => {
              //     getLocation();
              //     setIsStopwatchStart(!isStopwatchStart);
              //     setResetStopwatch(false);
              //     setStop(true);
              //   }}>
              //   Pausar etapa
              // </Button>
            )}
            {!isStopwatchStart && (
              <Button
                disabled={validate()}
                btnStyle={{backgroundColor: '#27C500', color: '#fff'}}
                onPress={() => {
                  getLocation(true);
                  setIsStopwatchStart(!isStopwatchStart);
                  setResetStopwatch(false);
                }}>
                {t('maps.startStep')}
              </Button>
            )}
            {stop && time !== 0 && (
              <>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#121A91',
                    width: '90%',
                    borderRadius: 8,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => nextStep()}>
                  <Text style={{color: '#FFF'}}>Próxima etapa</Text>
                </TouchableOpacity>
                {/* <Button
                  btnStyle={{backgroundColor: '#121A91', color: '#fff'}}
                  onPress={() => nextStep()}>
                  Próxima etapa
                </Button> */}
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: '#121A91',
                    width: '90%',
                    borderRadius: 8,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => endStep()}>
                  <Text style={{color: '#FFF'}}>Finalizar mapa</Text>
                </TouchableOpacity>
                {/* <Button
                  style={{paddingTop: 50}}
                  btnStyle={{backgroundColor: '#121A91', color: '#fff'}}
                  onPress={() => endStep()}>
                  Finalizar mapa
                </Button> */}
              </>
            )}
            <Button
              style={{paddingTop: 50}}
              outline
              onPress={() => navigation.goBack()}>
              {t('maps.cancel')}
            </Button>
          </View>
        </Content>
      </Container>
    </Main>
  );
}
