import React from "react";
import { withTheme } from "styled-components/native";
import { FlatList, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import Preview from "./Preview";

const VerticalPreviewList = ({ navigation, theme, title, movies }) => {
	return (
		<FlatList
			numColumns={3}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			data={movies}
			keyExtractor={movie => movie.slug}
			renderItem={({ item }) => (
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						navigation.navigate("MovieStack", {
							screen: "Movie",
							params: item
						});
					}}
				>
					<Preview sm poster={item.poster} />
				</TouchableOpacity>
			)}
			ListHeaderComponent={() => <AppText color={theme.green} padlg="true">{title}</AppText>}
		/>
	);
};

export default withTheme(VerticalPreviewList);
