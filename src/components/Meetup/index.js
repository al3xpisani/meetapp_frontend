import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage } from "react-native";
import api from "~/services/api";
import { Buffer } from "buffer";

import Moment from "moment";
import momentPTBR from "moment/src/locale/pt-br";

import Header from "~/components/Header";

import { withNavigation } from "react-navigation";

import {
  INSCREVER,
  NENHUM_MEMBRO_INSCRITO,
  ASSIGNUSERMEETUP,
  ASYNCSTORAGE_USERS,
  UPDATESUBSCRIPTIONS
} from "react-native-dotenv";

import {
  Content,
  View,
  ImageMeetup,
  Title,
  TitleMembros,
  TitleDescription,
  TitleEnd,
  Endereco,
  TextSalvar,
  ButtonSalvar,
  TextInscricaoRealizada,
  TextError
} from "./styles";

class Meetup extends Component {
  constructor(props) {
    super(props);
    Moment.defineLocale("pt-br", momentPTBR);
  }
  state = {
    loading: false,
    error: ""
  };

  signUp = async meetup => {
    const { navigation } = this.props;
    this.setState({ loading: true, error: "" });

    //pega no async o usuário logado
    const userIdSyncSrg = await AsyncStorage.getItem(ASYNCSTORAGE_USERS);

    if (!userIdSyncSrg) {
      this.setState({
        error: "erro async storage ao salvar na tabela meetups"
      });
      return false;
    }

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    const postData = {
      users_id: JSON.parse(userIdSyncSrg).data.user.id,
      user_name: JSON.parse(userIdSyncSrg).data.user.name,
      meetups_id: meetup["meetups_id"],
      meetup_name: meetup["Meetups.title"],
      meetup_date: meetup["Meetups.event_date"],
      is_registered: true
    };
    const dataRest = await api.post(
      `/${ASSIGNUSERMEETUP}`,
      postData,
      axiosConfig
    );

    if (dataRest.data.codeError == 401) {
      this.setState({
        error: dataRest.data.status,
        loading: false,
        refreshing: false
      });
    } else {
      //Atualiza o número de inscritos para a meetup

      const dataRestUpdateSubscriptions = await api.post(
        `/${UPDATESUBSCRIPTIONS}`,
        postData,
        axiosConfig
      );

      if (dataRestUpdateSubscriptions.data.codeError == 401) {
        this.setState({
          error: dataRestUpdateSubscriptions.data.status,
          loading: false,
          refreshing: false
        });
      }

      this.setState({ loading: false, data: dataRest.data, refreshing: false });
      navigation.navigate("Dashboard");
    }
  };

  render() {
    const { navigation } = this.props;
    const { loading, error } = this.state;
    const meetup = navigation.getParam("meetup");
    const compId = navigation.getParam("compId");
    console.log("@@@@@@@@@@@@@@@@@@@" + JSON.stringify(meetup));
    return (
      <Content>
        <Header hasBackButton={true} title={meetup["Meetups.title"]} />
        <ImageMeetup
          source={{
            uri: `data:image/jpeg;base64,${Buffer.from(
              meetup["Meetups.meetup_logo"].data
            )}`
          }}
        />
        <View>
          <Title>{meetup["Meetups.title"]}</Title>
          <TitleMembros>
            {meetup["Meetups.qtde_subscriptions"] > 0
              ? meetup["Meetups.qtde_subscriptions"] + " membros"
              : NENHUM_MEMBRO_INSCRITO}
          </TitleMembros>
          <TitleDescription>{meetup["Meetups.description"]}</TitleDescription>
          <TitleEnd>Realizado em :</TitleEnd>
          <Endereco>{meetup["Meetups.address"]}</Endereco>
          <Endereco>
            Data e hora : {Moment(meetup["Meetups.event_date"]).format("LLL")}
          </Endereco>
          <TextError>{!!error ? error : null}</TextError>
          {compId !== 1 && meetup.is_registered === false ? (
            <ButtonSalvar onPress={() => this.signUp(meetup)}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <TextSalvar>{INSCREVER}</TextSalvar>
              )}
            </ButtonSalvar>
          ) : (
            <TextInscricaoRealizada>
              Inscrição já realizada !
            </TextInscricaoRealizada>
          )}
        </View>
      </Content>
    );
  }
}

export default Meetup;
