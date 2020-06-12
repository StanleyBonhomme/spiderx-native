import React from "react";
import styled, { css } from "styled-components/native";
import { View, Image, StyleSheet } from "react-native";

export default function Preview({ poster, width, sm }) {
	return <StyledImage sm={sm} source={{ uri: poster }} />;
}

const StyledImage = styled.Image`
	border-radius: 6px;
	margin-right: 14px;
	margin-bottom: 10px;
	width: 120px;
	height: 170px;

	${props =>
		props.sm &&
		css`
			width: 100px;
			height: 150px;
			margin-right: 29px;
			margin-bottom: 18px;
		`}
`;
