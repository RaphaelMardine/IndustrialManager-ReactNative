import React, {useEffect, useState} from 'react';
import {edit} from '../../constants/icons';
import {
  Text,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  CardMap,
  CardTitle,
  CardDescription,
  CardDescriptionFactory,
  FabArea,
  SelectArea,
  HeadlineText,
  DescriptionText,
  Icon,
} from './styles';

import HeaderApp from '../../components/Header';
import {useTranslation} from 'react-i18next';
import Main from '../../components/Main';
import {useNavigation} from '@react-navigation/native';
import {plusIcon} from '../../constants/icons';
import PickerApp from '../../components/Picker';
import FabButton from '../../components/FabButton';
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';
import {Button} from '../../components/Button';
import ModalApp from '../../components/Modal';
import {
  ChildrenModal,
  TextLabel,
  TextModalFlow,
  TextModalTitle,
  ViewButton,
  ViewModalMap,
} from '../Parameters/styles';
import {Input} from '../../components/Input';
import {Image} from 'react-native-animatable';

export function Maps() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {user} = useAuth();
  const [maps, setMaps] = useState();
  const [singleMaps, setSingleMaps] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputUnit, setInputUnit] = useState('');
  const [inputFactory, setInputFactory] = useState('');
  const [inputSector, setInputSector] = useState('');
  const [inputCell, setInputCell] = useState('');
  const [inputMachine, setInputMachine] = useState('');
  const [inputTool, setInputTool] = useState('');
  const [idMap, setIdMap] = useState('');
  const [typeFlow, setTypeFlow] = useState(1);
  const [isStep, setIsStep] = useState('');
  const [selectedtypeMap, setSelectedtypeMap] = useState();
  const [selectedUnity, setSelectedUnity] = useState();
  const [selectedFactory, setSelectedFactory] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [unity] = useState([
    {
      label: 'Tipo de Mapa',
      value: 1,
    },
    {
      label: 'Show',
      value: 2,
    },
    {
      label: 'Show 2',
      value: 3,
    },
  ]);
  const [typeMap] = useState([
    {
      label: 'Unidade',
      value: 1,
    },
    {
      label: 'Show',
      value: 2,
    },
    {
      label: 'Show 2',
      value: 3,
    },
  ]);

  const [factory] = useState([
    {
      label: 'Fábrica',
      value: 1,
    },
    {
      label: 'Show 2',
      value: 2,
    },
    {
      label: 'Show 3',
      value: 3,
    },
  ]);

  function getParamType() {
    switch (typeFlow) {
      case 1:
        return 'shingo';
      case 2:
        return 'shingo4.0';
      case 3:
        return 'fluxograma';
    }
  }

  useEffect(() => {
    getMaps();
  }, []);

  async function getMaps() {
    try {
      const maps = await api.get('/maps', {
        params: {userId: user._id},
      });

      setMaps(maps.data);
    } catch (err) {
      alert('Não foi possível carregar os mapas');
    }
  }

  async function getSingleMap(id: string) {
    try {
      const singleMap = await api.get(`/maps/${id}`);
      setSingleMaps(singleMap);
      setInputName(singleMap.data[0].name);
      setInputCell(singleMap.data[0].cell);
      setInputFactory(singleMap.data[0].factory);
      setInputMachine(singleMap.data[0].machine);
      setInputSector(singleMap.data[0].sector);
      setInputTool(singleMap.data[0].tool);
      setInputUnit(singleMap.data[0].unit);
    } catch (err) {
      alert('Não foi possível carregar este mapa');
    }
  }
  async function getLocalMaps() {
    const map = await AsyncStorage.getItem('@nuntek:maps');
    setMaps(JSON.parse(map));
  }

  async function saveEditMap(
    id: string,
    inputName: string,
    inputUnit: string,
    inputFactory: string,
    inputSector: string,
    inputCell: string,
    inputMachine: string,
    inputTool: string,
  ) {
    try {
      setLoading(true);
      const response = await api.put(`/maps/${id}`, {
        name: inputName || undefined,
        unit: inputUnit || undefined,
        factory: inputFactory || undefined,
        sector: inputSector || undefined,
        cell: inputCell || undefined,
        machine: inputMachine || undefined,
        tool: inputTool || undefined,
      });

      setLoading(false);

      alert('Mapa editado com sucesso!');
    } catch (err) {
      setLoading(false);
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert('Não foi possível editar o mapa');
      }
    }
  }

  async function deleteMap(id: string) {
    try {
      setLoadingDel(true);
      const response = await api.delete(`/maps/${id}`, {});
      setLoadingDel(false);
      alert('Mapa apagado com sucesso!');
    } catch (err) {
      setLoadingDel(false);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }

  function editFlow(id: string, singleMaps: any) {
    return (
      <ChildrenModal>
        {singleMaps.data.map((item: any) => {
          return (
            <View style={{height: 500}}>
              <TextModalTitle style={{marginBottom: 10}}>
                Editar mapa
              </TextModalTitle>
              <Input
                value={inputName}
                onChangeText={text => {
                  setInputName(text);
                }}
                placeholder={t('maps.name')}
              />
              <Input
                value={inputUnit}
                onChangeText={text => {
                  setInputUnit(text);
                }}
                placeholder={t('maps.unit')}
              />
              <Input
                value={inputFactory}
                onChangeText={text => {
                  setInputFactory(text);
                }}
                placeholder={t('maps.factory')}
              />
              <Input
                value={inputSector}
                onChangeText={text => {
                  setInputSector(text);
                }}
                placeholder={t('maps.sector')}
              />
              <Input
                value={inputCell}
                onChangeText={text => {
                  setInputCell(text);
                }}
                placeholder={t('maps.cell')}
              />
              <Input
                value={inputMachine}
                onChangeText={text => {
                  setInputMachine(text);
                }}
                placeholder={t('maps.machine')}
              />
              <Input
                value={inputTool}
                onChangeText={text => {
                  setInputTool(text);
                }}
                placeholder={t('maps.tool')}
              />
              <ViewButton style={{marginTop: 25}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#121A91',
                    width: '100%',
                    borderRadius: 8,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  disabled={loading}
                  onPress={() => {
                    saveEditMap(
                      id,
                      inputName,
                      inputUnit,
                      inputFactory,
                      inputSector,
                      inputCell,
                      inputMachine,
                      inputTool,
                    );
                  }}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{color: '#FFF'}}>{t('button.save')}</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: '#FF0707',
                    width: '100%',
                    borderRadius: 8,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  disabled={loadingDel}
                  onPress={() => deleteMap(id)}>
                  {loadingDel ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{color: '#FFF'}}>{t('maps.delete')}</Text>
                  )}
                </TouchableOpacity>
                {/* <Button
                  onPress={() => deleteMap(id)}
                  style={{paddingTop: 50, width: '100%'}}
                  btnStyle={{backgroundColor: '#FF0707', color: '#FFF'}}>
                  {t('maps.delete')}
                </Button> */}
                <Button
                  // onPress={() => setShowModal(false)}
                  style={{marginTop: 10, width: '100%'}}
                  btnStyle={{backgroundColor: '#FFF', color: '#121A91'}}
                  onPress={() => setOpenEdit(!openEdit)}>
                  {t('button.cancel')}
                </Button>
              </ViewButton>
            </View>
          );
        })}
      </ChildrenModal>
    );
  }

  return (
    <Main onLeftPress={() => navigation.goBack()} title={t('maps.title')}>
      <Container>
        {/* <SelectArea>
            <View style={{width: 110, borderRadius: 50, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginRight:10, marginTop:38}}>
              <PickerApp
                items={typeMap}
                selected={selectedtypeMap}
                onChange={(value: any) => setSelectedtypeMap(value)}
              />
            </View>
            <View style={{width: 140, borderRadius: 50, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginRight:10, marginTop:38}}>
              <PickerApp
                items={unity}
                selected={selectedUnity}
                onChange={(value: any) => setSelectedUnity(value)}
              />
            </View>
            <View style={{width: 100, borderRadius: 50, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginTop:38}}>
              <PickerApp
                items={factory}
                selected={selectedFactory}
                onChange={(value: any) => setSelectedFactory(value)}
              />
            </View>
          </SelectArea> */}
        <Content style={{height: Dimensions.get('screen').height - 130}}>
          <ModalApp isVisible={openEdit} close={() => setOpenEdit(false)}>
            <ViewModalMap>
              {openEdit === true && editFlow(idMap, singleMaps)}
            </ViewModalMap>
          </ModalApp>
          {maps ? (
            maps.map((map: any) => {
              return (
                <CardMap
                  onPress={() => navigation.navigate('Details', {id: map._id})}
                  style={{marginTop: '2.5%'}}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                    }}>
                    <CardTitle
                      style={{
                        width: '20%',
                        marginRight: '-15%',
                        height: '100%',
                      }}
                      btnStyle={{backgroundColor: '#FF0707', color: '#FFF'}}
                      onPress={async () => {
                        try {
                          await getSingleMap(map._id);
                          setIdMap(map._id);
                          setOpenEdit(!openEdit);
                        } catch (error) {}
                      }}>
                      <Icon source={edit} />
                    </CardTitle>
                    <CardTitle>{map.name}</CardTitle>
                  </View>
                  <CardDescription>Mapa de {map.mapType}</CardDescription>
                  <CardDescriptionFactory>{map.unit}</CardDescriptionFactory>
                </CardMap>
              );
            })
          ) : (
            <>
              <HeadlineText>Você ainda não criou nenhum mapa!</HeadlineText>
              <DescriptionText>
                Clique no "+" para criar o seu primeiro mapa no VSMApp!
              </DescriptionText>
            </>
          )}
        </Content>
        <FabButton onPress={() => navigation.navigate('Maps/add')} />
      </Container>
    </Main>
  );
}
