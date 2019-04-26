import styled from "styled-components";
import { colors, metrics } from "~/styles";

import Icon from "react-native-vector-icons/MaterialIcons";

import { getStatusBarHeight } from "react-native-status-bar-height";

export const ViewHeader = styled.View`
  display: flex;
  height: ${54 + parseInt(getStatusBarHeight())};
  border-bottom-width: 1;
  border-bottom-color: ${colors.whiteTransparent};
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  background-color: #e5556e;
  padding-bottom: 15px;
`;

export const ViewTitle = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px;
  border-color: #fff; */
  /* margin-left: ${metrics.baseMargin * 5}px; */
`;

export const ViewBack = styled.View`
  /* border: 1px;
  border-color: #fff; */
  width: 40px;
  margin: 0;
  padding: 0;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: Helvetica-Bold;
  color: ${colors.white};
`;

export const Iconf = styled(Icon)`
  /* justify-content: flex-start; */
  padding:0;
  margin:0;
  /* padding-right: ${metrics.baseMargin * 3}px; */
  /* border-bottom-color: #000;
  border: 1px; */
`;

export const IconBack = styled(Icon)`
  justify-content: flex-start;
  margin-left: ${metrics.baseMargin * 2}px;
  /* border-bottom-color: #000;
  border: 1px; */
`;

export const ProfileTouch = styled.TouchableOpacity``;

export const ProfileTouchback = styled.TouchableOpacity``;
