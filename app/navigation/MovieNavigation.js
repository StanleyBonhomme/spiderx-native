import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MovieScreen from "../screens/MovieScreen";
import PlayMovieScreen from "../screens/PlayMovieScreen";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Movie"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Movie" component={MovieScreen} />
    <Stack.Screen name="PlayMovie" component={PlayMovieScreen} />
  </Stack.Navigator>
);
