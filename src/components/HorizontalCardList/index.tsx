import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import { materiaPrima, inspecao, deslocamento, esperalote, processamento, naoAgregacao, esperaProcessamento, estoqueSemiacabado } from '../../constants/icons';

const itemDrop = [
  {
    label: 'Estoque de matéria prima',
    icon: materiaPrima
  },
  {
    label: 'Não agregação de valor',
    icon: naoAgregacao
  },
  {
    label: 'Inspeção',
    icon: inspecao
  },
  {
    label: 'Espera por lote',
    icon: esperalote
  },
  {
    label: 'Transporte',
    icon: deslocamento
  },
  {
    label: 'Espera de processamento',
    icon: esperaProcessamento
  },
  {
    label: 'Processamento',
    icon: processamento
  },
  {
    label: 'Estoque de semiacabado',
    icon: estoqueSemiacabado
  },
]

const HorizontalCardList: React.FC = ({ data }: any) => {
  return (
    <FlatList
      data={data} 
      keyExtractor={(item, index) => String(index)}
      horizontal
      contentInsetAdjustmentBehavior="never"
      snapToAlignment="start"
      decelerationRate={"fast"}
      snapToInterval={310}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) =>
      <View key={index} style={{
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#CACACA",
        elevation: 3,
        height: 188,
        width: 310,
        borderRadius: 5,
        marginTop: 50,
        marginBottom: 15,
        padding: 20,
      }}>
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <Image source={itemDrop[item.selectedtypeMap -1] && itemDrop[item.selectedtypeMap -1].icon} />
        </View>
        <View style={{justifyContent: "center", flex: 1}}>
          <Text style={{fontWeight: "bold", fontSize: 15}}>{itemDrop[item.selectedtypeMap -1] && itemDrop[item.selectedtypeMap -1].label}</Text>
          {item.stepName && <Text>Nome da etapa: {item.stepName}</Text>}
          {item.time && <Text>Tempo: {item.time}</Text>}
          {item.distance ? <Text>Distância: {item.distance} Mts</Text> : null}
        </View>
      </View>
      }
    />
  );
};

export default HorizontalCardList;
