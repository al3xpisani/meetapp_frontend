import styled from "styled-components";
import { colors, metrics } from "~/styles";

import Icon from "react-native-vector-icons/MaterialIcons";

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: ${metrics.baseMargin}px;
  margin-bottom: ${metrics.baseMargin * 3}px;
  margin-right: ${metrics.baseMargin * 2}px;
  padding-bottom: ${metrics.baseMargin * 6}px;
`;

export const ViewColumn = styled.View`
  flex-direction: column;
`;

export const ViewSubscriptionDetails = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: ${metrics.basePadding}px;
  border: 0.1px;
  margin-top: 0px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 340px;
  position: absolute;
  top: 150px;
`;

export const Title = styled.Text`
  font-family: Helvetica-Bold;
  font-size: 16px;
  color: ${colors.white};
  text-align: left;
  padding-bottom: ${metrics.basePadding}px;
`;

export const Image = styled.Image`
  border-radius: 10px;
  height: 170;
  width: 340;
`;

export const Touchable = styled.TouchableOpacity`
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 0px;
  border: 0.1px;
  border-radius: 100px;
  background-color: #e5556e;
`;

export const Iconf = styled(Icon).attrs({
  name: "chevron-right",
  size: 28,
  color: "#fff"
})`
  align-self: center;
`;

export const Membros = styled.Text`
  margin-top: ${metrics.baseMargin - 5}px;
  font-family: Helvetica;
  font-size: 14px;
  color: #999999;
  text-align: left;
`;

export const TitleMeetup = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: "tail"
})`
  font-family: Helvetica-Bold;
  font-size: 16px;
  color: #222222;
  text-align: left;
`;
