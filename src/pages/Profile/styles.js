import styled from "styled-components/native";
import { TextField } from "react-native-material-textfield";

import { colors, metrics } from "~/styles";

export const ViewContent = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  background: #22202b;
  justify-content: center;
  padding-left: ${metrics.basePadding}px;
  padding-right: ${metrics.basePadding}px;
  padding-bottom: ${metrics.basePadding * 2}px;

  /* border: 1px;
  border-color: #fff; */
`;

export const ViewInputs = styled.View`

  /* padding-top: ${metrics.basePadding}px; */
  /* padding-bottom: ${metrics.basePadding}px; */

  /* border: 1px;
  border-color: #fff; */
`;

export const PrefText = styled.Text`
  font-family: Helvetica-Bold;
  font-size: 16px;
  color: ${colors.white};
  text-align: left;
  margin-top: ${metrics.baseMargin * 4}px;
`;

export const InputTextSenha = styled(TextField).attrs({
  secureTextEntry: true,
  textColor: "#fff",
  baseColor: "#fff",
  tintColor: "#d55f70",
  labelFontSize: 18,
  fontSize: 16,
  inputContainerPadding: 10
})``;

export const InputTextSenhaConfirma = styled(TextField).attrs({
  secureTextEntry: true,
  textColor: "#fff",
  baseColor: "#fff",
  tintColor: "#d55f70",
  labelFontSize: 18,
  fontSize: 16,
  inputContainerPadding: 10
})``;

export const TextLoginName = styled.Text`
  font-family: Helvetica-Bold;
  font-size: 20px;
  color: #ffffff;
  text-align: left;
  margin-top: ${metrics.baseMargin}px;

  margin-bottom: ${metrics.basePadding}px;
`;

export const ButtonLogin = styled.TouchableOpacity`
  border-radius: 35;
  background-color: #d55f70;
  align-items: center;
  padding: ${metrics.basePadding}px;
  margin-top: ${metrics.baseMargin * 4}px;
`;

export const TextLogin = styled.Text`
  color: ${colors.white};
  font-family: Helvetica-Bold;
  font-size: 16;
`;

export const ViewCheckBox = styled.View`
  margin-top: ${metrics.baseMargin * 2}px;
  flex-direction: row;
  align-items: center;
`;

export const CheckBox = styled.View.attrs({
  hitSlop: { top: 10, bottom: 10, left: 10, right: 190 }
})`
  height: 20px;
  width: 20px;
  border: 0.4px;
  border-color: ${colors.whiteTransparent};
  border-radius: 50px;
`;

export const CheckBoxText = styled.Text`
  margin-left: 10px;
  font-family: Helvetica;
  font-size: 18px;
  color: ${colors.white};
  padding: 0;
`;

export const ErrorText = styled.Text`
  color: ${colors.danger};
  font-size: 14px;
  font-family: Helvetica;
  margin: ${metrics.baseMargin * 2}px;
  text-align: center;
`;
