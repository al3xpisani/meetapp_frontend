import React, { Component, Fragment } from "react";
import {
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  RefreshControl
} from "react-native";
import api from "~/services/api";
import moment from "moment";
import {
  withNavigationFocus,
  NavigationEvents,
  StackActions,
  NavigationActions
} from "react-navigation";

import {
  USERSNOTSUBSCRIPTED,
  ASYNCSTORAGE_USERS,
  MEETUPSCHEDULED,
  RECOMMENDEDETTUP,
  MEETUPSEARCHBYTITLE
} from "react-native-dotenv";

import SubItem from "./SubItem";
import { Title, Content, View } from "./styles";

class Subscription extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: [],
    // data: [
    //   {
    //     id: 1,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   },
    //   {
    //     id: 2,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   },
    //   {
    //     id: 3,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   },
    //   {
    //     id: 4,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   },
    //   {
    //     id: 5,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   },
    //   {
    //     id: 6,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   },
    //   {
    //     id: 7,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   },
    //   {
    //     id: 8,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   },
    //   {
    //     id: 9,
    //     title: "Meetup de devs Chico Xavier",
    //     description: "alvaro@gmail.com",
    //     meetup_logo:
    //       "http://www.thesecretcabal.com/portals/0/Site%20Images/Meetup1.jpg",
    //     devops: "CBMK",
    //     address: "Rua conchinchina",
    //     qtde_subscriptions: 100
    //   }
    // ],
    loading: true,
    refreshing: false,
    title: "",
    compId: ""
  };

  componentDidMount() {
    const { title, compId } = this.props;
    this.setState({ title, compId });

    this.refreshListItem();
  }

  refreshListItem = async () => {
    this.setState({ refreshing: true });
    let dataRest = "";

    //pega user id do asyncstorage e passa no body da req.
    const userIdSyncSrg = await AsyncStorage.getItem(ASYNCSTORAGE_USERS);
    console.log("userIdSync " + userIdSyncSrg);
    if (!userIdSyncSrg) {
      return false;
    }

    var postData = {
      users_id: JSON.parse(userIdSyncSrg).data.user.id,
      allowedDateLoad: moment().format()
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    //se for para listar os próximos meetups, então pega
    //a data atual do celular e chama a api rest para listar
    //os próximos meeetups com data maior que a data do device.

    let apiRest = "";

    //componente de Inscritos
    if (this.state.compId === 1) {
      apiRest = USERSNOTSUBSCRIPTED;

      //próximos meetups
    } else if (this.state.compId === 2) {
      apiRest = MEETUPSCHEDULED;

      //recommended meetups
    } else if (this.state.compId === 3) {
      apiRest = RECOMMENDEDETTUP;

      //Search by title
    } else if (this.state.compId === 4) {
      const { searchByTitle } = this.props;
      apiRest = MEETUPSEARCHBYTITLE;

      postData = {
        users_id: JSON.parse(userIdSyncSrg).data.user.id,
        allowedDateLoad: moment().format(),
        searchByTitle
      };
    }

    dataRest = await api.post(`/${apiRest}`, postData, axiosConfig);

    this.setState({ loading: false, data: dataRest.data, refreshing: false });
  };

  listItem = ({ item }) => {
    console.log(item);
    return (
      <SubItem
        compId={this.state.compId}
        navigation={this.props.navigation}
        repository={item}
      />
    );
  };

  renderList = () => {
    const { data, refreshing, compId } = this.state;

    return (
      <FlatList
        key={data.id}
        horizontal={(compId !== 3) & (compId !== 4) ? true : false}
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.listItem}
        onRefresh={this.refreshListItem}
        refreshing={refreshing}
      />
    );
  };

  didFocus = async payload => {
    const isFocused = this.props.navigation.isFocused();
    //console.log("didFocus : " + this.props.navigation.isFocused());

    if (isFocused) {
      this.setState({ data: [], loading: true });
      this.refreshListItem();
    }
  };

  didBlur = payload => {
    console.log("didBlur : " + this.props.navigation.isFocused());
  };

  render() {
    const { loading, title, data, compId } = this.state;

    return (
      <Content>
        <NavigationEvents
          onWillFocus={payload => console.log("will focus", payload)}
          onDidFocus={payload => this.didFocus(payload)}
          onWillBlur={payload => console.log("will blur", payload)}
          onDidBlur={payload => this.didBlur(payload)}
        />
        {/* compId = 4 ,vem da activity de Buscar */}
        {!loading ? (
          compId === 4 ? (
            <Title>
              {data.length > 0
                ? title + " (" + data.length + ")"
                : `Nenhum resultado encontrado`}
            </Title>
          ) : (
            <Title>
              {data.length > 0
                ? title + " (" + data.length + ")"
                : title + " : Nenhuma meetup"}
            </Title>
          )
        ) : null}

        {loading ? (
          <View>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          this.renderList()
        )}
      </Content>
    );
  }
}

export default withNavigationFocus(Subscription);
