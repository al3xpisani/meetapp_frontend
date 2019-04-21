import styled from "styled-components";
import { colors, metrics } from "~/styles";

export const Content = styled.View`
  flex: 1;
  margin-right: ${metrics.baseMargin * 2}px;
  margin-left: ${metrics.baseMargin * 2}px;
  padding: 0px;
`;

export const View = styled.View`
  padding: 20px;
  margin: 20px;
`;

export const Title = styled.Text`
  margin-top: ${metrics.baseMargin}px;
  margin-bottom: ${metrics.baseMargin}px;
  padding: 0px;
  font-family: Helvetica-Bold;
  font-size: 18px;
  color: ${colors.white};
  text-align: left;
`;
