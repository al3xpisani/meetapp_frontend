import React from "react";
import { Buffer } from "buffer";

import { withNavigation } from "react-navigation";

import { NENHUM_MEMBRO_INSCRITO } from "react-native-dotenv";

import {
  Content,
  Image,
  ViewSubscriptionDetails,
  Touchable,
  Membros,
  TitleMeetup,
  ViewColumn,
  Iconf
} from "./style";

openMeetupDetails = (navigation, repository, compId) => {
  navigation.navigate("Meetup", { meetup: repository, compId });
};

const SubItem = ({ compId, navigation, repository }) => (
  <Content>
    <Image
      source={{
        uri: `data:image/jpeg;base64,${Buffer.from(
          repository["Meetups.meetup_logo"].data
        )}`
      }}
    />
    <ViewSubscriptionDetails>
      <ViewColumn>
        <TitleMeetup>{repository["Meetups.title"]}</TitleMeetup>
        <Membros>
          {repository["Meetups.qtde_subscriptions"] > 0
            ? repository["Meetups.qtde_subscriptions"] + " membros"
            : NENHUM_MEMBRO_INSCRITO}
        </Membros>
      </ViewColumn>
      <Touchable
        onPress={() => this.openMeetupDetails(navigation, repository, compId)}
      >
        <Iconf />
      </Touchable>
    </ViewSubscriptionDetails>
  </Content>
);

export default withNavigation(SubItem);
