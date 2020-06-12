import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled, { withTheme } from "styled-components/native";
import { firebase } from "../services/firebase";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { AuthContext } from "../../App.js";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Logo from "../styles/Logo";
import InputMessage from "../components/InputMessage";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).max(12).label("Password"),
});

const LoginScreen = ({ navigation, theme }) => {
  const { setUserToken } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(async (res) => {
          if (res.user.uid) {
            await AsyncStorage.setItem("userToken", res.user.uid);
            setUserToken(res.user.uid);
            ToastAndroid.show("Successfully logged in", ToastAndroid.SHORT);
          }
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code === "auth/user-not-found") {
            ToastAndroid.show(
              "The email you entered is not registered yet",
              ToastAndroid.SHORT,
              ToastAndroid.TOP
            );
          } else if (err.code === "auth/wrong-password") {
            ToastAndroid.show(
              "Password does not match",
              ToastAndroid.SHORT,
              ToastAndroid.TOP
            );
          }
        });
    },
  });

  return (
    <ScreenContainer>
      <Center>
        <Logo source={require("../assets/logo.png")} />
      </Center>

      <InputContainer>
        <InputMessageContainer>
          <InputMessage
            error={formik.errors.email}
            visible={formik.touched.email}
            color={theme.accentColor}
          />
          <AppInput
            icon="mail"
            placeholder="manikandan@gmail.com"
            value={formik.values.email || ""}
            onChangeText={formik.handleChange("email")}
          />
        </InputMessageContainer>

        <InputContainer>
          <InputMessageContainer>
            <InputMessage
              error={formik.errors.password}
              visible={formik.touched.password}
              color={theme.accentColor}
            />
            <AppInput
              icon="key"
              secureTextEntry
              placeholder="mysuperpassword"
              value={formik.values.password || ""}
              onChangeText={formik.handleChange("password")}
            />
          </InputMessageContainer>
        </InputContainer>

        <Center>
          <AppButton title="Login" onPress={formik.handleSubmit} />
        </Center>

        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <AppText color={theme.secondaryColor}>
            Don't have an account?{" "}
          </AppText>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <AppText color={theme.accentColor}>Signup</AppText>
          </TouchableOpacity>
        </View>
      </InputContainer>
    </ScreenContainer>
  );
};

const Center = styled.View`
  align-self: center;
  margin: 12px 0;
`;

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bg};
  padding-left: 20px;
  padding-top: 100px;
`;

const InputContainer = styled.View`
  width: 95%;
`;

const InputMessageContainer = styled.View`
  margin: 4px 0;
`;

export default withTheme(LoginScreen);
