import React from "react";
import styled, { css, withTheme } from "styled-components/native";
import { TextInput, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AppInput = ({ icon, theme, nospace, ...props }) => {
  return (
    <IconInputContainer>
      {icon && (
        <AntDesign
          style={{ marginRight: 10, position: "relative", top: 2 }}
          name={icon}
          nospace={nospace}
          color={theme.secondaryColor}
          size={22}
        />
      )}
      <InputContainer
        placeholderTextColor={theme.secondaryColor}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </IconInputContainer>
  );
};

const IconInputContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.dark};
  padding: 12px 20px;
  margin: 10px 0;

  ${(props) =>
    props.nospace &&
    css`
      margin: 0;
    `}
`;

const InputContainer = styled.TextInput`
  color: ${(props) => props.theme.white};
  font-size: 16px;
  font-family: ${(props) => props.theme.font};
  border-radius: 9px;
  width: 100%;
`;

export default withTheme(AppInput);
