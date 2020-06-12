import React from "react";
import { withTheme } from "styled-components/native";
import SkeletonContent from "react-native-skeleton-content";

const textLayout = [{ height: 20, width: 160, alignSelf: "flex-start" }];

const cardLayout = [
  {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  { height: 50, width: 290, marginLeft: 15, position: "relative", top: 10 },
];

const threeColumn = [
  { width: 100, height: 140, marginRight: 29, marginBottom: 18 },
  { width: 100, height: 140, marginRight: 29, marginBottom: 18 },
  { width: 100, height: 140, marginRight: 29, marginBottom: 18 },
];

const horizontalList = [
  { width: 120, height: 170, marginRight: 29, marginBottom: 18 },
  { width: 120, height: 170, marginRight: 29, marginBottom: 18 },
  { width: 120, height: 170, marginRight: 29, marginBottom: 18 },
];

const cardCount = [1, 2, 3, 4];
export const CardSkeleton = withTheme(({ theme, loading, notitle }) => (
  <>
    {!notitle ? (
      <SkeletonContent
        isLoading={loading}
        layout={textLayout}
        containerStyle={{ marginTop: 15, marginBottom: 19 }}
        boneColor={theme.dark}
        highlightColor={theme.dark2}
      />
    ) : null}
    {cardCount.map((el) => (
      <SkeletonContent
        key={el}
        isLoading={loading}
        layout={cardLayout}
        containerStyle={{ flexDirection: "row", marginBottom: 10 }}
        boneColor={theme.dark}
        highlightColor={theme.dark2}
      ></SkeletonContent>
    ))}
  </>
));

const gridCount = [1, 2, 3];
export const GridSkeleton = withTheme(({ loading, theme }) => (
  <>
    <SkeletonContent
      isLoading={loading}
      layout={textLayout}
      containerStyle={{ marginVertical: 18 }}
      boneColor={theme.dark}
      highlightColor={theme.dark2}
    />
    {gridCount.map((el) => (
      <SkeletonContent
        key={el}
        isLoading={loading}
        layout={threeColumn}
        containerStyle={{ flexDirection: "row", marginVertical: 10 }}
        boneColor={theme.dark}
        highlightColor={theme.dark2}
      />
    ))}
  </>
));

export const GenreSkeleton = withTheme(({ loading, theme }) => (
  <>
    <SkeletonContent
      isLoading={loading}
      layout={textLayout}
      containerStyle={{ marginVertical: 18 }}
      boneColor={theme.dark}
      highlightColor={theme.dark2}
    />
    <SkeletonContent
      isLoading={loading}
      layout={horizontalList}
      containerStyle={{ flexDirection: "row", marginVertical: 10 }}
      boneColor={theme.dark}
      highlightColor={theme.dark2}
    />
  </>
));

const genreCount = [1, 2, 3];
export const GenreScreenSkeleton = withTheme(({ loading, theme }) => (
  <>
    {genreCount.map((el) => (
      <GenreSkeleton key={el} loading={loading} />
    ))}
  </>
));
