import React from "react";
import { withTheme } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
	HomeIcon,
	SearchIcon,
	ImdbIcon,
	MyListIcon,
	GenreIcon
} from "../components/TabBarIcons";

import PreviewScreen from "../screens/PreviewScreen";
import SearchScreen from "../screens/SearchScreen";
import ImdbScreen from "../screens/ImdbScreen";
import GenreScreen from "../screens/GenreScreen";
import MyListScreen from "../screens/MyListScreen";

const Tab = createBottomTabNavigator();

const HomeNavigation = ({ theme }) => (
	<Tab.Navigator
		initialRouteName="Trending"
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				if (route.name === "Trending") {
					return focused ? (
						<HomeIcon color={theme.tabActive} />
					) : (
						<HomeIcon color={theme.tabInactive} />
					);
				} else if (route.name === "Search") {
					return focused ? (
						<SearchIcon color={theme.tabActive} />
					) : (
						<SearchIcon color={theme.tabInactive} />
					);
				} else if (route.name === "Imdb") {
					return focused ? (
						<ImdbIcon color={theme.tabActive} />
					) : (
						<ImdbIcon color={theme.tabInactive} />
					);
				} else if (route.name === "MyList") {
					return focused ? (
						<MyListIcon color={theme.tabActive} />
					) : (
						<MyListIcon color={theme.tabInactive} />
					);
				} else if (route.name === "Genre") {
					return focused ? (
						<GenreIcon color={theme.tabActive} />
					) : (
						<GenreIcon color={theme.tabInactive} />
					);
				}
			}
		})}
		tabBarOptions={{
			showLabel: false,
			keyboardHidesTabBar: true,
			style: {
				backgroundColor: theme.tabBg,
				borderTopColor: "transparent"
			}
		}}
	>
		<Tab.Screen name="Trending" component={PreviewScreen} />
		<Tab.Screen name="Search" component={SearchScreen} />
		<Tab.Screen name="Imdb" component={ImdbScreen} />
		<Tab.Screen name="Genre" component={GenreScreen} />
		<Tab.Screen name="MyList" component={MyListScreen} />
	</Tab.Navigator>
);

export default withTheme(HomeNavigation);
