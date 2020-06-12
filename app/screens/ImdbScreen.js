import React from "react";
import { withTheme } from "styled-components/native";
import { StatusBar, View } from "react-native";
import VerticalPreviewList from "../components/VerticalPreviewList";
import { GridSkeleton } from "../skeleton";
import useCollection from "../hooks/useCollection";

const ImdbScreen = ({ navigation, theme }) => {
  const movies = useCollection("topimdb");

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, paddingHorizontal: 10 }}>
      <StatusBar />

      {!movies.length ? <GridSkeleton loading={!movies.length} /> : null}

      {movies.length ? (
        <VerticalPreviewList
          title="Tob IMDB"
          movies={movies}
          navigation={navigation}
        />
      ) : null}
    </View>
  );
};

export default withTheme(ImdbScreen);
