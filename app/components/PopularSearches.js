import React from "react";
import { withTheme } from "styled-components/native";
import { TouchableOpacity, View, FlatList } from "react-native";
import Card from "./Card";
import AppText from "./AppText";

const PopularSearches = ({ searches, theme, navigation }) => {
	return (
		<View style={{ marginVertical: 20 }}>
			<AppText color={theme.green}>Popular Searches</AppText>
			<FlatList
				data={searches}
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
							poster={item.poster}
							cast={item.cast}
						/>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default withTheme(PopularSearches);
