import React from "react";
import styled, { css } from "styled-components/native";
import { Text, StyleSheet } from "react-native";

export default function AppText({
  children,
  pad,
  padlg,
  padtop,
  size,
  color,
  weight,
  style,
}) {
  return (
    <StyledText
      style={style}
      size={size}
      pad={pad}
      padlg={padlg}
      padtop={padtop}
      color={color}
      weight={weight}
    >
      {children}
    </StyledText>
  );
}

const StyledText = styled.Text`
  font-family: ${(props) => props.theme.font};
  color: ${(props) => (props.color ? props.color : props.theme.white)};
  letter-spacing: 1px;
  font-size: 18px;
  font-size: ${(props) => (props.size ? `${props.size}px` : "18px")};
  font-weight: ${(props) => (props.weight ? props.weight : 400)};
  padding: ${(props) => (props.pad === "true" ? "10px 0" : "0")};

  ${(props) =>
    props.padlg &&
    css`
      padding: 15px 0;
    `}

  ${(props) =>
    props.padtop &&
    css`
      padding-top: 15px;
    `}
`;
