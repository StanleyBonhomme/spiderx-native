import React, { useState, useContext, createContext, useEffect } from "react";
import { useFonts } from "@use-expo/font";
import { AsyncStorage } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./app/navigation/AuthNavigation";
import RootNavigation from "./app/navigation/RootNavigation";
import theme from "./app/config/theme";

export const AuthContext = createContext("");

export default () => {
  console.disableYellowBox = true;
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken !== null) {
          setUserToken(userToken);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getToken();
    setLoading(false);
  });

  const [fontsLoaded] = useFonts({
    Poppins: require("./app/assets/fonts/Poppins.otf"),
  });

  if (loading || !fontsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ userToken, setUserToken }}>
        <NavigationContainer>
          {userToken ? <RootNavigation /> : <AuthNavigation />}
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};
