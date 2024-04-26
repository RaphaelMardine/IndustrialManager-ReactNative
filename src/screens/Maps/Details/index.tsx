import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Container, Content} from '../styles';
import {
  CardHeader,
  CardFooter,
  TextBold,
  HeadlineText,
  HeadlineTextLight,
  TextLight,
  Row,
} from '../Details/styles';
import HeaderApp from '../../../components/Header';
import Main from '../../../components/Main';
import HorizontalCardList from '../../../components/HorizontalCardList';
import api from '../../../services/api';
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

export function Details() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [maps, setMaps] = useState();
  const [tNav, setTNav] = useState(null);
  const [mapType, setMapType] = useState(null);
  const [tav, setTav] = useState(null);
  const [totalTimeMap, setTotalTimeMap] = useState(null);
  const [av, setAv] = useState(null);
  const [lt, setLt] = useState(null);
  const [individualPercentValue, setIndividualPercentValue] = useState(0);

  const {params} = route;

  async function getMaps() {
    const maps = await api.get(`/maps/${params.id}`);
    const map = maps.data[0];
    setMapType(map.mapType);
    console.log(map);

    map.steps.unshift({
      time: null,
      stepName: null,
      selectedtypeMap: 1,
      loteLength: null,
      distance: null,
    });

    map.steps.push({
      time: null,
      stepName: null,
      selectedtypeMap: 8,
      loteLength: null,
      distance: null,
    });

    setMaps(map);

    setTimeout(() => {
      sumTnav();
    }, 6000);
  }

  useEffect(() => {
    if (isFocused) {
      getMaps();
    }
  }, [isFocused, maps]);

  function timestrToSec(timestr) {
    var parts = timestr.split(':');
    return parts[0] * 3600 + parts[1] * 60 + +parts[2];
  }

  function pad(num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return '' + num;
    }
  }

  function formatTime(seconds) {
    return [
      pad(Math.floor(seconds / 3600)),
      pad(Math.floor(seconds / 60) % 60),
      pad(seconds % 60),
    ].join(':');
  }

  function sumTnav() {
    let countTav = 0;
    let total = 0;
    let count = 0;
    if (maps && maps.steps) {
      for (let index = 0; index < maps.steps.length; index++) {
        const element = maps.steps[index];
        if (element.time) {
          total += timestrToSec(element.time);
          if (element.selectedtypeMap && element.selectedtypeMap != 7) {
            count += timestrToSec(element.time);
          } else {
            countTav += timestrToSec(element.time);
          }
        }
      }
    }

    if (total > 0) {
      setTotalTimeMap(formatTime(total));
    }

    if (count > 0) {
      // Este é o TNAV
      setTav(formatTime(count));
      // Este é o TAV
      setTNav(formatTime(countTav));
      let ltVar = 0;
      ltVar += countTav; //TAV
      ltVar += count; //TNAV
      setLt(formatTime(ltVar));

      setAv((countTav / ltVar) * 100);
    }
  }

  const header = () => {};

  const itemDrop = [
    {
      label: 'Estoque de matéria prima',
      icon: materiaPrima,
    },
    {
      label: 'Não agregação de valor',
      icon: naoAgregacao,
    },
    {
      label: 'Inspeção',
      icon: inspecao,
    },
    {
      label: 'Espera por lote',
      icon: esperalote,
    },
    {
      label: 'Transporte',
      icon: deslocamento,
    },
    {
      label: 'Espera de processamento',
      icon: esperaProcessamento,
    },
    {
      label: 'Processamento',
      icon: processamento,
    },
    {
      label: 'Estoque de semiacabado',
      icon: estoqueSemiacabado,
    },
  ];

  function getAcumulado(item, key) {
    let acumulado = null;
    let prevValue = 0;
    if (key == 1) {
      acumulado = ((timestrToSec(item.time) / timestrToSec(lt)) * 100).toFixed(
        2,
      );
    } else {
      acumulado = (
        (timestrToSec(maps.steps[key - 1].time) / timestrToSec(lt)) * 100 +
        (timestrToSec(item.time) / timestrToSec(lt)) * 100
      ).toFixed(2);
    }

    return acumulado;
  }

  async function okPress(url) {
    await Linking.openURL(url);
  }

  async function generatePdf() {
    try {
      setLoading(true);
      const data = {
        maps,
        lt,
        tav,
        tNav,
      };

      const response = await api.post('/maps/pdf', data);
      setLoading(false);
      Alert.alert('Sucesso', 'PDF gerado com sucesso!', [
        {text: 'OK', onPress: () => okPress(response.data)},
      ]);
    } catch (err) {
      console.log(err);
      alert('Não foi possível gerar o PDF');
    }
  }

  return (
    <>
      <Main
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {
          navigation.navigate(
            mapType === 'shingo4.0' ? 'Maps/Shingo4' : 'Maps/Shingo',
            {id: params.id},
          );
        }}
        // onRightPress={() => navigation.navigate("Maps/Shingo4")}
        title="Resumo">
        <Container style={{backgroundColor: '#fafafa'}}>
          <Content>
            <HeadlineText style={{marginTop: 30}}>
              {maps && maps.name}
            </HeadlineText>
            <HeadlineTextLight>Mapa de Shingo</HeadlineTextLight>
            <View style={{marginTop: 50, flex: 1}}>
              <CardHeader>
                <Row>
                  <TextBold>Unidade: </TextBold>
                  <TextLight>{maps && maps.unit}</TextLight>
                </Row>
                <Row>
                  <TextBold>Fabrica: </TextBold>
                  <TextLight>{maps && maps.factory}</TextLight>
                </Row>
                <Row>
                  <TextBold>Setor: </TextBold>
                  <TextLight>{maps && maps.sector}</TextLight>
                </Row>
                <Row>
                  <TextBold>Célula: </TextBold>
                  <TextLight>{maps && maps.cell}</TextLight>
                </Row>
              </CardHeader>
              {maps && maps.steps ? (
                <>
                  <HorizontalCardList data={maps.steps} />
                  <CardFooter>
                    {av ? (
                      <TextBold>% AV: {av && av.toFixed(2)}%</TextBold>
                    ) : null}
                    <TextLight>Agregação de Valor</TextLight>
                    {lt ? <TextBold>LT (lead time): {lt}</TextBold> : null}
                    <TextLight>Agregação de Valor</TextLight>
                    {tNav ? <TextBold>TAV: {tNav}</TextBold> : null}
                    <TextLight>Tempo de Agregação de Valor</TextLight>
                    {tav ? <TextBold>TNAV: {tav}</TextBold> : null}
                    <TextLight>Tempo de Não Agregação de Valor</TextLight>
                    <TextBold>Paretos</TextBold>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{flex: 1, fontSize: 11}}>Simbolo</Text>
                      <Text style={{flex: 1, fontSize: 11}}>Atividade</Text>
                      <Text style={{flex: 1, fontSize: 11}}>
                        Tempo Total do desperdício
                      </Text>
                      <Text style={{flex: 1, fontSize: 11}}>% Individual</Text>
                      <Text style={{flex: 1, fontSize: 11}}>% Acumulado</Text>
                    </View>
                    {maps.steps.map((item: any, key) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: 10,
                          borderBottomWidth: 1,
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{flex: 1}}
                          source={
                            itemDrop[item.selectedtypeMap - 1] &&
                            itemDrop[item.selectedtypeMap - 1].icon
                          }
                        />
                        <Text style={{flex: 1, fontSize: 11}}>
                          {itemDrop[item.selectedtypeMap - 1] &&
                            itemDrop[item.selectedtypeMap - 1].label}
                        </Text>
                        <Text style={{flex: 1, fontSize: 11}}>{item.time}</Text>
                        <Text style={{flex: 1, fontSize: 11}}>
                          {item.time &&
                            lt &&
                            (
                              (timestrToSec(item.time) / timestrToSec(lt)) *
                              100
                            ).toFixed(2)}
                        </Text>
                        <Text style={{flex: 1, fontSize: 11}}>
                          {item.time && lt && getAcumulado(item, key)}
                        </Text>
                      </View>
                    ))}
                  </CardFooter>
                </>
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#121A91',
                borderRadius: 8,
                height: 28,
                justifyContent: 'center',
                marginBottom: 30,
              }}
              onPress={() => generatePdf()}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Exportar Mapa
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        </Container>
      </Main>
    </>
  );
}
