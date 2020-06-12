import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { withTheme } from "styled-components/native";
import VerticalPreviewList from "../components/VerticalPreviewList";
import { GridSkeleton } from "../skeleton";
import useCollection from '../hooks/useCollection'

const PreviewScreen = ({ navigation, theme }) => {
	const movies = useCollection('trending');

	return (
		<View style={{ flex: 1, backgroundColor: theme.bg, paddingHorizontal: 10 }}>
			<StatusBar />

			{!movies.length ? <GridSkeleton loading={!movies.length} /> : null}

			{movies.length ? (
				<VerticalPreviewList
					title="Trending Movies"
					movies={movies}
					navigation={navigation}
				/>
			) : null}
		</View>
	);
};

export default withTheme(PreviewScreen);
