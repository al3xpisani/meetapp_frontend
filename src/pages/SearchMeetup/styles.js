import styled from "styled-components/native";
import { colors, metrics } from "~/styles";

import { TextField } from "react-native-material-textfield";
import Icon from "react-native-vector-icons/MaterialIcons";

export const View = styled.View`
  flex: 1;
  background: #22202b;
`;

export const ContentRow = styled.View`
  /* flex-direction: row; */
`;

export const Content = styled.View`
  padding-right: ${metrics.basePadding}px;
  padding-left: ${metrics.basePadding}px;
  padding-bottom: ${metrics.basePadding}px;
`;

export const ContentIcon = styled.View`
  /* flex-direction: row; */
`;

export const Iconf = styled(Icon).attrs({
  name: "search",
  size: 28,
  color: "#fff"
})`
  align-self: center;
  margin-right: 20px;
  position: absolute;
  top: 34;
  left: 15;
`;

export const InputTextTitulo = styled(TextField).attrs({
  textColor: "#fff",
  baseColor: "#fff",
  textColor: "#fff",
  baseColor: "#fff",
  tintColor: "#d55f70",
  labelFontSize: 18,
  fontSize: 16,
  inputContainerPadding: 10,
  labelTextStyle: { paddingLeft: 32 },
  inputContainerStyle: { paddingLeft: 32 }
})``;
