import React from "react";
import styled, { withTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { View, Image, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";

const Card = ({ title, poster, cast, navigation, theme }) => {
  return (
    <CardContainer>
      <RoundImage resizeMode="cover" source={{ uri: poster }} />
      <Info>
        <AppText size={15}>{title}</AppText>
        <AppText size={15} color={theme.secondaryColor}>
          {cast && cast.slice(0, 2).join(", ")}
        </AppText>
      </Info>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 12px;
  margin: 10px 0;
  background-color: ${(props) => props.theme.dark};
  elevation: 1;
  border-radius: 4px;
`;

const RoundImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  align-self: center;
`;

const Info = styled.View`
  margin-left: 15px;
  width: 75%;
`;

export default withTheme(Card);
