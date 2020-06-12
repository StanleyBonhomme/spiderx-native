import React from "react";
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Logo from "../styles/Logo";

const AuthScreen = ({ navigation, theme }) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.bg,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<LogoContainer>
				<Logo source={require("../assets/logo.png")} />
				<AppText>Welcome to SpiderX</AppText>
			</LogoContainer>

			<AppButton
				title="Join Now"
				onPress={() => navigation.navigate("Signup")}
			></AppButton>

			<LoginContainer>
				<AppText color={theme.secondaryColor}>
					Already have an account?{" "}
				</AppText>

				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<AppText color={theme.accentColor}>Login</AppText>
				</TouchableOpacity>
			</LoginContainer>
		</View>
	);
};

const ScreenContainer = styled.View`
	align-items: center;
`;

const LogoContainer = styled.View`
	align-items: center;
	margin-bottom: 50px;
`;

const LoginContainer = styled.View`
	flex-direction: row;
	margin-top: 40px;
`;

export default withTheme(AuthScreen);
