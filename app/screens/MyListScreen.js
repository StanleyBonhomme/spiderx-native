import React, { useEffect, useState, useContext } from "react";
import { withTheme } from "styled-components/native";
import { StatusBar, ScrollView, View, AsyncStorage } from "react-native";
import { AuthContext } from "../../App.js";
import db from "../services/firebase";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import MyListMovies from "../components/MyListMovies";
import { CardSkeleton } from "../skeleton";

const MyListScreen = ({ theme, navigation }) => {
	const { userToken, setUserToken } = useContext(AuthContext);
	const [movies, setMovies] = useState([]);

	const handleLogout = async () => {
		await AsyncStorage.removeItem("userToken");
		setUserToken(null);
	};

	useEffect(() => {
		db.collection(`users/${userToken}/movies`).onSnapshot(snapshot => {
			const movies = [];
			snapshot.forEach(doc => movies.push(doc.data()));
			setMovies(movies);
		});
	}, []);

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: theme.bg, paddingHorizontal: 10 }}
		>
			<StatusBar />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginVertical: 20
				}}
			>
				<AppText color={theme.green} padtop="true">
					Your Movies
				</AppText>

				<AppButton
					title="Sign Out"
					onPress={handleLogout}
					background={theme.grey}
					size={14}
					bg={theme.grey}
				/>
			</View>

			{!movies.length ? <CardSkeleton notitle="notrue" loading={!movies.length} /> : null}

			<MyListMovies movies={movies} navigation={navigation} />
		</ScrollView>
	);
};

export default withTheme(MyListScreen);
