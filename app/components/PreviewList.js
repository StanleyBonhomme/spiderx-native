import React from "react";
import { withTheme } from "styled-components/native";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import Preview from "./Preview";

const PreviewList = ({ navigation, theme, title, movies }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <AppText color={theme.green} pad="true">
        {title}
      </AppText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(movie) => movie.slug}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("MovieStack", {
                screen: "Movie",
                params: item,
              });
            }}
          >
            <Preview poster={item.poster} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default withTheme(PreviewList);
