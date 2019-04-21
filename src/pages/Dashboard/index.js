import PropTypes from "prop-types";
import React, { Component } from "react";
import { ScrollView } from "react-native";

import Header from "~/components/Header";
import Subscriptions from "~/components/Subscription";

import {
  INICIO,
  INSCRICOES,
  PROXIMOMEETUP,
  RECOMENDADOS
} from "react-native-dotenv";

import { View } from "./styles";

import Icon from "react-native-vector-icons/MaterialIcons";

const tabIcon = ({ tintColor }) => (
  <Icon name="home" size={28} color={tintColor} />
);
tabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this._onScroll = this._onScroll.bind(this);
  }
  static navigationOptions = {
    tabBarIcon: tabIcon
  };

  _onScroll(event) {
    const scrollPosition =
      event &&
      event.nativeEvent &&
      event.nativeEvent.contentOffset &&
      event.nativeEvent.contentOffset.y;
    let newBouncesValue;
    if (scrollPosition < 0) {
      // console.log("scroll position ..... " + scrollPosition);
    }
  }

  render() {
    return (
      <View>
        <Header title={INICIO} />
        <ScrollView onScroll={this._onScroll}>
          <Subscriptions title={INSCRICOES} compId={1} />
          <Subscriptions title={PROXIMOMEETUP} compId={2} />
          <Subscriptions title={RECOMENDADOS} compId={3} />
        </ScrollView>
      </View>
    );
  }
}
