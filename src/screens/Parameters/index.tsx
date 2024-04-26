import React, {useEffect, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  FlowTitle,
  PlusIcon,
  FlowButton,
  ViewModal,
  ChildrenModal,
  TextModalTitle,
  TextModalFlow,
  TextLabel,
  ViewButton,
  Badge,
  TextBadge,
} from './styles';
import Main from '../../components/Main';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import ModalApp from '../../components/Modal';
import {plusIcon} from '../../constants/icons';
import {useAuth} from '../../hooks/auth';
import RadioButton from '../../components/RadioButton';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {useTranslation} from 'react-i18next';

export function Parameters() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {signIn, user} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [typeFlow, setTypeFlow] = useState(1);
  const [inputText, setInputText] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditDelete, setOpenEditDelete] = useState(false);
  const [idParam, setIdParam] = useState('');
  const [selectedParam, setSelectedParam] = useState('');

  const clearInput = () => {
    setInputText('');
  };

  const checkboxValues = [
    {
      key: '1',
      text: 'Sim',
    },
    {
      key: '2',
      text: 'Não',
    },
  ];

  function editFlow(id: string, Fluxo: string, selectedParam: string) {
    console.log(selectedParam, 'selectedParammmm');
    return (
      <ChildrenModal>
        <View style={{height: 250}}>
          <TextModalTitle>Editar parâmetro</TextModalTitle>
          <TextModalFlow>{Fluxo}</TextModalFlow>
          <TextLabel>Nome do parâmetro</TextLabel>
          <Input
            value={inputText}
            onChangeText={text => {
              setInputText(text);
            }}
            placeholder={`${selectedParam}`}
          />
          <ModalApp
            isVisible={openEditDelete}
            close={() => setOpenEditDelete(false)}>
            <ViewModal>
              {openEditDelete === true && deleteParamPage(idParam)}
            </ViewModal>
          </ModalApp>
          <ViewButton style={{marginTop: 25}}>
            <Button
              style={{width: '100%'}}
              btnStyle={{backgroundColor: '#121A91', color: '#FFF'}}
              onPress={() => saveEditParam(id, inputText)}>
              {t('button.save')}
            </Button>
            <Button
              onPress={() => setOpenEditDelete(true)}
              style={{paddingTop: 50, width: '100%'}}
              btnStyle={{backgroundColor: '#FF0707', color: '#FFF'}}>
              {t('button.delete')}
            </Button>

            <Button
              onPress={() => setOpenEdit(!openEdit)}
              style={{paddingTop: 50, width: '100%'}}
              btnStyle={{backgroundColor: '#FFF', color: '#121A91'}}>
              {t('button.cancel')}
            </Button>
          </ViewButton>
        </View>
      </ChildrenModal>
    );
  }

  function resourcesFlow() {
    return (
      <ChildrenModal>
        <TextModalTitle>Novo parâmetro</TextModalTitle>
        <TextModalFlow>Fluxo de Recursos (Exceto RH)</TextModalFlow>
        <TextLabel>Nome do parâmetro</TextLabel>
        <Input
          value={inputText}
          onChangeText={text => {
            setInputText(text);
          }}
          placeholder={t('flow.resourceExample')}
        />
      </ChildrenModal>
    );
  }

  function informationalFlow() {
    return (
      <ChildrenModal>
        <TextModalTitle>Novo parâmetro</TextModalTitle>
        <TextModalFlow>Fluxo Informacional</TextModalFlow>

        <TextLabel>Nome do parâmetro</TextLabel>
        <Input
          value={inputText}
          onChangeText={text => {
            setInputText(text);
          }}
          placeholder={t('flow.informationalExample')}
        />

        <TextLabel>Informações vinculadas ao sistema?</TextLabel>
        <RadioButton values={checkboxValues} />
      </ChildrenModal>
    );
  }

  function personalFlow() {
    return (
      <ChildrenModal>
        <TextModalTitle>Novo parâmetro.</TextModalTitle>
        <TextModalFlow>Fluxo Pessoal</TextModalFlow>
        <TextLabel>Nome do parâmetro</TextLabel>
        <Input
          value={inputText}
          onChangeText={text => {
            setInputText(text);
          }}
          placeholder={t('flow.personalExample')}
        />
      </ChildrenModal>
    );
  }

  function stepsFlow() {
    return (
      <ChildrenModal>
        <TextModalTitle>Novo parâmetro</TextModalTitle>
        <TextModalFlow>Adicionar Etapa</TextModalFlow>
        <TextLabel>Nome da etapa</TextLabel>
        <Input
          value={inputText}
          onChangeText={text => {
            setInputText(text);
          }}
          placeholder={t('flow.personalExample')}
        />
      </ChildrenModal>
    );
  }

  function deleteParamPage(id: string) {
    return (
      <ChildrenModal>
        <View style={{height: 150}}>
          <TextModalTitle style={{textAlign: 'center'}}>
            Você deseja apagar o parâmetro?
          </TextModalTitle>
          <ViewButton>
            <Button
              onPress={() => deleteParam(id)}
              style={{paddingTop: 50, width: '100%'}}
              btnStyle={{backgroundColor: '#FF0707', color: '#FFF'}}>
              {t('button.delete')}
            </Button>

            <Button
              onPress={() => setOpenEditDelete(!openEditDelete)}
              style={{paddingTop: 50, width: '100%'}}
              btnStyle={{backgroundColor: '#FFF', color: '#121A91'}}>
              {t('button.cancel')}
            </Button>
          </ViewButton>
        </View>
      </ChildrenModal>
    );
  }

  function addParam(type: number) {
    setTypeFlow(type);
    setShowModal(!showModal);
    getNewParams();
  }

  function getParamType() {
    switch (typeFlow) {
      case 1:
        return 'resourceFlow';
      case 2:
        return 'operationalFunctionFlow';
      case 3:
        return 'personalFlow';
      case 4:
        return 'stepFlow';
    }
  }

  async function save() {
    try {
      const response = await api.post('/params', {
        name: inputText,
        paramType: getParamType(),
        userId: user._id,
      });

      alert('Parâmetro cadastrado com sucesso!');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }

  async function saveEditParam(id: string, inputText: string) {
    try {
      const response = await api.put(`/params/${id}`, {
        name: inputText,
        paramType: getParamType(),
        userId: user._id,
      });

      alert('Parâmetro editado com sucesso!');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }

  async function deleteParam(id: string) {
    try {
      const response = await api.delete(`/params/${id}`, {
        paramType: getParamType(),
      });

      alert('Parâmetro apagado com sucesso!');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }

  const [isPersonal, setIsPersonal] = useState('');
  const [isOperational, setIsOperational] = useState('');
  const [isStep, setIsStep] = useState('');
  const [isResource, setIsResource] = useState('');
  async function getNewParams() {
    const personal = await api.get(
      `/params?paramType=personalFlow&userId=${user._id}`,
    );
    const operational = await api.get(
      `/params?paramType=operationalFunctionFlow&userId=${user._id}`,
    );
    const step = await api.get(`/params?paramType=stepFlow&userId=${user._id}`);
    const resource = await api.get(
      `/params?paramType=resourceFlow&userId=${user._id}`,
    );
    setIsResource(resource);
    setIsStep(step);
    setIsOperational(operational);
    setIsPersonal(personal);
  }

  useEffect(() => {
    getNewParams();
  }, []);

  useEffect(() => {
    getNewParams();
  }, [openEdit]);

  return (
    <Main onLeftPress={() => navigation.goBack()} title={t('parameters.title')}>
      <Container>
        <ModalApp isVisible={showModal} close={() => setShowModal(false)}>
          <ViewModal>
            {typeFlow == 1 && resourcesFlow()}
            {typeFlow == 2 && informationalFlow()}
            {typeFlow == 3 && personalFlow()}
            {typeFlow == 4 && stepsFlow()}
          </ViewModal>
          <ViewButton>
            <TouchableOpacity
              onPress={() => save()}
              style={{
                width: '100%',
                backgroundColor: '#121A91',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                {t('button.save')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clearInput}
              style={{
                width: '100%',
                backgroundColor: '#FF0707',
                borderRadius: 8,
                marginTop: 50,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                {t('button.clear')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 8,
                marginTop: 50,
              }}>
              <Text
                style={{
                  color: '#121A91',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                {t('button.cancel')}
              </Text>
            </TouchableOpacity>
          </ViewButton>
        </ModalApp>

        <Content>
          <FlowTitle>Fluxo de Recursos (exceto RH)</FlowTitle>
          {/* <BadgeArea> */}
          {isResource != '' ? (
            isResource.data.map((map: any) => {
              const Fluxo = 'Fluxo de Recursos (Exceto RH)';
              return (
                <Badge
                  key={map._id}
                  onPress={() => {
                    setIdParam(map._id);
                    setOpenEdit(!openEdit);
                    setSelectedParam(map.name);
                  }}>
                  <TextBadge>{map.name}</TextBadge>
                  <ModalApp
                    isVisible={openEdit}
                    close={() => setOpenEdit(false)}>
                    <ViewModal>
                      {openEdit === true &&
                        editFlow(idParam, Fluxo, selectedParam)}
                    </ViewModal>
                  </ModalApp>
                </Badge>
              );
            })
          ) : (
            <View>
              <Text>Carregando...</Text>
            </View>
          )}
          {/* </BadgeArea> */}
          <FlowButton title="button add flow" onPress={() => addParam(1)}>
            <PlusIcon source={plusIcon} />
            <Text>Adicionar parâmetro</Text>
          </FlowButton>
          <FlowTitle>Fluxo Informacional</FlowTitle>
          {/* <BadgeArea> */}
          {isOperational != '' ? (
            isOperational.data.map((map: any) => {
              const Fluxo = 'Fluxo Informacional';
              return (
                <Badge
                  key={map._id}
                  onPress={() => {
                    setIdParam(map._id);
                    setOpenEdit(!openEdit);
                    setSelectedParam(map.name);
                  }}>
                  <TextBadge>{map.name}</TextBadge>
                  <ModalApp
                    isVisible={openEdit}
                    close={() => setOpenEdit(false)}>
                    <ViewModal>
                      {openEdit === true &&
                        editFlow(idParam, Fluxo, selectedParam)}
                    </ViewModal>
                  </ModalApp>
                </Badge>
              );
            })
          ) : (
            <View>
              <Text>Carregando...</Text>
            </View>
          )}
          {/* </BadgeArea> */}
          <FlowButton title="button add flow" onPress={() => addParam(2)}>
            <PlusIcon source={plusIcon} />
            <Text>Adicionar parâmetro</Text>
          </FlowButton>
          <FlowTitle>Fluxo Pessoal</FlowTitle>
          {/* <BadgeArea> */}
          {isPersonal != '' ? (
            isPersonal.data.map((map: any) => {
              const Fluxo = 'Fluxo  Pessoal';
              return (
                <Badge
                  key={map._id}
                  onPress={() => {
                    setIdParam(map._id);
                    setOpenEdit(!openEdit);
                    setSelectedParam(map.name);
                  }}>
                  <TextBadge>{map.name}</TextBadge>
                  <ModalApp
                    isVisible={openEdit}
                    close={() => setOpenEdit(false)}>
                    <ViewModal>
                      {openEdit === true &&
                        editFlow(idParam, Fluxo, selectedParam)}
                    </ViewModal>
                  </ModalApp>
                </Badge>
              );
            })
          ) : (
            <View>
              <Text>Carregando...</Text>
            </View>
          )}
          {/* </BadgeArea> */}
          <FlowButton title="button add flow" onPress={() => addParam(3)}>
            <PlusIcon source={plusIcon} />
            <Text>Adicionar parâmetro</Text>
          </FlowButton>
          <FlowTitle>Etapas</FlowTitle>
          {/* <BadgeArea> */}
          {isStep != '' ? (
            isStep.data.map((map: any) => {
              const Fluxo = 'Etapas';
              return (
                <Badge
                  key={map._id}
                  onPress={() => {
                    setIdParam(map._id);
                    setOpenEdit(!openEdit);
                    setSelectedParam(map.name);
                  }}>
                  <TextBadge>{map.name}</TextBadge>
                  <ModalApp
                    isVisible={openEdit}
                    close={() => setOpenEdit(false)}>
                    <ViewModal>
                      {openEdit === true &&
                        editFlow(idParam, Fluxo, selectedParam)}
                    </ViewModal>
                  </ModalApp>
                </Badge>
              );
            })
          ) : (
            <View>
              <Text>Carregando...</Text>
            </View>
          )}
          {/* </BadgeArea> */}
          <FlowButton title="button add flow" onPress={() => addParam(4)}>
            <PlusIcon source={plusIcon} />
            <Text>Adicionar parâmetro</Text>
          </FlowButton>
        </Content>
      </Container>
    </Main>
  );
}
