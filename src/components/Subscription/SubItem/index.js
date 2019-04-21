import React from "react";
import { Buffer } from "buffer";

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

const SubItem = ({ repository }) => (
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
          {repository.qtde_subscriptions > 0
            ? repository.qtde_subscriptions + " membros"
            : NENHUM_MEMBRO_INSCRITO}
        </Membros>
      </ViewColumn>
      <Touchable>
        <Iconf />
      </Touchable>
    </ViewSubscriptionDetails>
  </Content>
);

export default SubItem;
