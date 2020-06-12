import React from "react";
import styled, { css } from "styled-components/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";

export default function AppButton({ title, onPress, bg, size }) {
  return (
    <ButtonContainer bg={bg} onPress={onPress}>
      <AppText size={size}>{title}</AppText>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.bg ? props.bg : props.theme.accentColor};
  padding: 8px 16px;
  margin: 4px 0;
  border-radius: 4px;
  margin-right: 10px;
`;
