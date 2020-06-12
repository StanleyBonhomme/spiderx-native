import React, { useEffect, useContext, useState } from "react";
import { withTheme } from "styled-components/native";
import { TouchableOpacity, View, FlatList } from "react-native";
import { AuthContext } from "../../App.js";
import Card from "./Card";

const MyListMovies = ({ movies, theme, navigation }) => {
	return (
		<View>
			<FlatList
				data={movies}
				showsVerticalScrollIndicator={false}
				keyExtractor={movie => movie.slug}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("MovieStack", {
								screen: "Movie",
								params: item
							});
						}}
					>
						<Card
							title={item.title}
							navigation={navigation}
							poster={item.poster}
							title={item.title}
							cast={item.cast}
						/>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default withTheme(MyListMovies);
