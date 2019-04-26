import React, { Component, Fragment } from "react";
import { AsyncStorage } from "react-native";

import api from "~/services/api";

import {
  DEVOPS,
  FRONTEND,
  BACKEND,
  MOBILE,
  GESTAO,
  MARKETING,
  PREFERENCIA,
  ASYNCSTORAGE_USERS,
  UPDATEUSERPREFS,
  SESSIONS
} from "react-native-dotenv";

import {
  Content,
  ButtonLogin,
  TextLogin,
  CheckBox,
  ViewCheckBox,
  ViewInputs,
  ViewContent,
  CheckBoxText,
  ErrorText,
  TextLoginName,
  InputTextSenha,
  InputTextSenhaConfirma,
  PrefText
} from "./styles";

import { colors } from "~/styles";

import Header from "~/components/Header";

export default class Profile extends Component {
  state = {
    loading: false,
    error: "",
    devops: "",
    email: "",
    userName: "",
    pwd: "",
    pwdConfirma: ""
  };

  constructor(props) {
    super(props);
    updateColors = [];
    checkBoxIDs = ["CBFE", "CBBE", "CBMB", "CBDO", "CBGT", "CBMK"];
  }

  async componentDidMount() {
    await this.getAsyncUserInfo();
    await this.initializeCheckBoxElements();
  }

  getAsyncUserInfo = async () => {
    const user = await AsyncStorage.getItem(ASYNCSTORAGE_USERS);

    this.setState({
      email: JSON.parse(user).data.user.email,
      userName: JSON.parse(user).data.user.name,
      devops: JSON.parse(user).data.user.devops
    });
    console.log(JSON.parse(user));
  };

  goDash = async () => {
    try {
      let devops = "";
      this.setState({ error: false });
      //validate. at least one element must be setted up as true
      checkBoxIDs.forEach(element => {
        if (updateColors["set_" + element] === true) {
          devops += element;
          //console.tron.log(`element is true ${elementsValidated}`);
        } else {
          //console.tron.log(`element is false ${element}`);
        }
      });
      if (!devops) {
        //console.tron.log("pelo menos uma preferencia deve ser selecionada");
        this.setState({ error: "Escolha uma preferência", loading: false });
        return false;
      }
      //Proceed with profile update on user table
      const { navigation } = this.props;

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };

      //Verifica se a senha digitada === senha BD
      var postDataCheckpwd = {
        email: this.state.email,
        password: this.state.pwd
      };

      const response = await api.post(
        `/${SESSIONS}`,
        postDataCheckpwd,
        axiosConfig
      );
      console.log(response);
      //on error catch...

      var postData = {
        email: this.state.email,
        devops: devops
      };

      const dataRest = await api.post(
        `/${UPDATEUSERPREFS}`,
        postData,
        axiosConfig
      );

      const asyncStr = {
        data: {
          user: {
            email: this.state.email,
            devops: devops
          }
        }
      };
      await AsyncStorage.mergeItem(
        ASYNCSTORAGE_USERS,
        JSON.stringify(asyncStr)
      );
      this.setState({ loading: false, error: "" });
      navigation.navigate("Dashboard");
    } catch (error) {
      if (String(error).includes("400")) {
        this.setState({ loading: false, error: "Senha incorreta" });
        return false;
      }
    }
  };

  initializeCheckBoxElements() {
    checkBoxIDs.forEach(element => {
      if (String(this.state.devops).includes(element)) {
        updateColors["color_" + element] = "#d55f70";
        updateColors["set_" + element] = true;
      } else {
        updateColors["color_" + element] = colors.whiteTransparent;
        updateColors["set_" + element] = false;
      }
    });
    this.setState(updateColors);
  }

  checkBoxValidation = ID => {
    if (updateColors["set_" + ID] === false) {
      updateColors["set_" + ID] = true;
      updateColors["color_" + ID] = "#d55f70";
    } else {
      updateColors["set_" + ID] = false;
      updateColors["color_" + ID] = colors.whiteTransparent;
    }
  };

  onTouch = ID => {
    this.checkBoxValidation(ID);
    this.setState(updateColors);
  };

  render() {
    const { loading, error, userName, pwd, pwdConfirma } = this.state;
    const { navigation } = this.props;
    return (
      <Fragment>
        <Header title="Perfil" hasBackButton="true" showProfileButton="false" />
        <Content>
          <TextLoginName>{userName}</TextLoginName>
          <ViewInputs>
            <InputTextSenha
              autoCapitalize="none"
              autoCorrect={false}
              label="Sua senha secreta"
              value={pwd}
              onChangeText={e => this.setState({ pwd: e })}
            />
            <InputTextSenhaConfirma
              autoCorrect={false}
              label="Confirme sua senha secreta"
              value={pwdConfirma}
              onChangeText={e => this.setState({ pwdConfirma: e })}
            />
          </ViewInputs>

          <PrefText>{PREFERENCIA}</PrefText>
          <ViewCheckBox
            onStartShouldSetResponder={() => true}
            onResponderStart={e => this.onTouch(checkBoxIDs[0])}
          >
            <CheckBox
              style={{
                backgroundColor: !this.state["set_" + checkBoxIDs[0]]
                  ? colors.whiteTransparent
                  : this.state["color_" + checkBoxIDs[0]]
              }}
            />
            <CheckBoxText>{FRONTEND}</CheckBoxText>
          </ViewCheckBox>

          <ViewCheckBox
            onStartShouldSetResponder={() => true}
            onResponderStart={e => this.onTouch(checkBoxIDs[1])}
          >
            <CheckBox
              style={{
                backgroundColor: !this.state["set_" + checkBoxIDs[1]]
                  ? colors.whiteTransparent
                  : this.state["color_" + checkBoxIDs[1]]
              }}
            />
            <CheckBoxText>{BACKEND}</CheckBoxText>
          </ViewCheckBox>

          <ViewCheckBox
            onStartShouldSetResponder={() => true}
            onResponderStart={e => this.onTouch(checkBoxIDs[2])}
          >
            <CheckBox
              style={{
                backgroundColor: !this.state["set_" + checkBoxIDs[2]]
                  ? colors.whiteTransparent
                  : this.state["color_" + checkBoxIDs[2]]
              }}
            />
            <CheckBoxText>{MOBILE}</CheckBoxText>
          </ViewCheckBox>

          <ViewCheckBox
            onStartShouldSetResponder={() => true}
            onResponderStart={e => this.onTouch(checkBoxIDs[3])}
          >
            <CheckBox
              style={{
                backgroundColor: !this.state["set_" + checkBoxIDs[3]]
                  ? colors.whiteTransparent
                  : this.state["color_" + checkBoxIDs[3]]
              }}
            />
            <CheckBoxText>{DEVOPS}</CheckBoxText>
          </ViewCheckBox>

          <ViewCheckBox
            onStartShouldSetResponder={() => true}
            onResponderStart={e => this.onTouch(checkBoxIDs[4])}
          >
            <CheckBox
              style={{
                backgroundColor: !this.state["set_" + checkBoxIDs[4]]
                  ? colors.whiteTransparent
                  : this.state["color_" + checkBoxIDs[4]]
              }}
            />
            <CheckBoxText>{GESTAO}</CheckBoxText>
          </ViewCheckBox>

          <ViewCheckBox
            onStartShouldSetResponder={() => true}
            onResponderStart={e => this.onTouch(checkBoxIDs[5])}
          >
            <CheckBox
              style={{
                backgroundColor: !this.state["set_" + checkBoxIDs[5]]
                  ? colors.whiteTransparent
                  : this.state["color_" + checkBoxIDs[5]]
              }}
            />
            <CheckBoxText>{MARKETING}</CheckBoxText>
          </ViewCheckBox>

          <ButtonLogin onPress={this.goDash}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <TextLogin>Salvar</TextLogin>
            )}
          </ButtonLogin>

          <ErrorText>
            {!!error
              ? error
              : pwd !== pwdConfirma
              ? "As senhas digitadas não são iguais"
              : null}
          </ErrorText>
        </Content>
      </Fragment>
    );
  }
}
