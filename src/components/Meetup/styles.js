import styled from "styled-components";
import { colors, metrics } from "~/styles";

import Icon from "react-native-vector-icons/MaterialIcons";

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  background: #22202b;
`;

export const View = styled.View`
  margin: ${metrics.baseMargin * 2}px;
`;

export const ImageMeetup = styled.Image`
  border-radius: 0px;
  height: 170;
  width: 100%;
`;
export const Title = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: "tail"
})`
  font-family: Helvetica-Bold;
  font-size: 16px;
  color: #ffffff;
  text-align: left;

  margin-bottom: ${metrics.baseMargin}px;
`;

export const TextInscricaoRealizada = styled.Text`
  font-family: Helvetica-Bold;
  font-size: 18px;
  text-align: center;
  color: ${colors.danger};
  margin: ${metrics.baseMargin * 2}px;
`;

export const TitleMembros = styled.Text`
  font-family: Helvetica;
  font-size: 14px;
  color: #999999;
  text-align: left;

  margin-bottom: ${metrics.baseMargin * 2}px;
`;
export const TitleDescription = styled.Text`
  opacity: 0.8;
  font-family: Helvetica;
  font-size: 16px;
  color: #ffffff;
  line-height: 28px;
  text-align: left;

  margin-bottom: ${metrics.baseMargin * 3}px;
`;
export const TitleEnd = styled.Text`
  font-family: Helvetica;
  font-size: 14px;
  color: #fff;
  text-align: left;
  margin-bottom: ${metrics.baseMargin}px;
`;
export const Endereco = styled.Text`
  opacity: 0.8;
  font-family: Helvetica;
  font-size: 14px;
  color: #ffffff;
  line-height: 24px;
  text-align: left;
`;

export const ButtonSalvar = styled.TouchableOpacity`
  border-radius: 35;
  background-color: #d55f70;
  align-items: center;
  padding: ${metrics.basePadding}px;
  margin-top: ${metrics.baseMargin * 4}px;
`;

export const TextSalvar = styled.Text`
  color: ${colors.white};
  font-family: Helvetica-Bold;
  font-size: 16;
`;

export const TextError = styled.Text`
  text-align: center;
  color: ${colors.danger};
  font-family: Helvetica-Bold;
  font-size: 18;
  margin-top: ${metrics.baseMargin * 4}px;
`;
