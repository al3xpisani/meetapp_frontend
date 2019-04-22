import PropTypes from "prop-types";
import React, { Component } from "react";

import Header from "~/components/Header";
import Subscriptions from "~/components/Subscription";

import { NavigationEvents } from "react-navigation";

import {
  View,
  InputTextTitulo,
  Content,
  Iconf,
  ContentIcon,
  ContentRow
} from "./styles";

import { BUSCAR } from "react-native-dotenv";
import Icon from "react-native-vector-icons/MaterialIcons";

const tabIcon = ({ tintColor }) => (
  <Icon name="search" size={28} color={tintColor} />
);
tabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
export default class SearchMeetup extends Component {
  state = {
    search: "",
    doSearch: false
  };
  static navigationOptions = {
    tabBarIcon: tabIcon
  };

  onClick = () => {
    this.setState({ doSearch: true });
  };

  didFocus = async payload => {
    this.setState({ doSearch: false, search: "" });
  };

  render() {
    const { search, doSearch } = this.state;
    return (
      <View>
        <NavigationEvents onDidFocus={payload => this.didFocus(payload)} />
        <Header title="Buscar" />
        <ContentRow>
          <ContentIcon>
            <Iconf />
          </ContentIcon>
          <Content>
            <InputTextTitulo
              autoCapitalize="none"
              autoCorrect={false}
              label={BUSCAR}
              value={search}
              onSubmitEditing={this.onClick}
              onChangeText={e => this.setState({ search: e, doSearch: false })}
            />
          </Content>
        </ContentRow>
        {doSearch ? (
          <Subscriptions
            title="Resultado da busca"
            searchByTitle={search}
            compId={4}
          />
        ) : null}
      </View>
    );
  }
}
