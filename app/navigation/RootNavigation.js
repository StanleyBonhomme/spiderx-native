import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigation from "./HomeNavigation";
import MovieNavigation from "./MovieNavigation";

const Stack = createStackNavigator();

export default ({ navigation }) => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Home" component={HomeNavigation} />
    <Stack.Screen
      name="MovieStack"
      component={MovieNavigation}
      navigation={navigation}
    />
  </Stack.Navigator>
);
