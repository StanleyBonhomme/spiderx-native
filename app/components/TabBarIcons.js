import React from "react";
import { AntDesign, Ionicons, Fontisto } from "@expo/vector-icons";

export const SearchIcon = ({ color }) => (
  <AntDesign name="search1" size={24} color={color} />
);

export const HomeIcon = ({ color }) => (
  <AntDesign name="home" size={24} color={color} />
);

export const GenreIcon = ({ color }) => (
  <AntDesign name="appstore-o" size={24} color={color} />
);

export const MyListIcon = ({ color }) => (
  <Ionicons name="md-list" size={24} color={color} />
);

export const ImdbIcon = ({ color }) => (
  <Fontisto name="imdb" size={24} color={color} />
);
