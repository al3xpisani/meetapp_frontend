import React, { Fragment, Component } from "react";

import {
  withNavigation,
  StackActions,
  NavigationActions
} from "react-navigation";

import {
  ViewHeader,
  Title,
  Iconf,
  ViewTitle,
  ProfileTouch,
  ProfileTouchback,
  IconBack,
  ViewBack
} from "./styles";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  goBack = async () => {
    const { navigation } = this.props;
    const navigateAction = NavigationActions.navigate({
      key: null,
      routeName: "Dashboard",
      action: StackActions.reset({ index: 0, routeName: "Dashboard" })
    });
    navigation.dispatch(navigateAction);
  };

  goProfile = async () => {
    const { navigation } = this.props;
    const navigateAction = NavigationActions.navigate({
      key: null,
      routeName: "Profile",
      action: StackActions.reset({ index: 0, routeName: "Profile" })
    });
    navigation.dispatch(navigateAction);
  };

  render() {
    const { title, hasBackButton, showProfileButton } = this.props;
    return (
      <Fragment>
        <ViewHeader>
          <ViewBack>
            {hasBackButton ? (
              <ProfileTouchback onPress={this.goBack}>
                <IconBack name="keyboard-arrow-left" size={28} color="#fff" />
              </ProfileTouchback>
            ) : null}
          </ViewBack>
          <ViewTitle>
            <Title>{title}</Title>
          </ViewTitle>
          <ViewBack>
            {!showProfileButton ? (
              <ProfileTouch onPress={this.goProfile}>
                <Iconf name="person-outline" size={28} color="#fff" />
              </ProfileTouch>
            ) : null}
          </ViewBack>
        </ViewHeader>
      </Fragment>
    );
  }
}
export default withNavigation(Header);
