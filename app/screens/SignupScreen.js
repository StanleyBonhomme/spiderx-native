import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled, { withTheme } from "styled-components/native";
import { firebase } from "../services/firebase";
import { AuthContext } from "../../App.js";
import {
  View,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
} from "react-native";
import Logo from "../styles/Logo";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import InputMessage from "../components/InputMessage";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).max(12).label("Password"),
});

const SignupScreen = ({ navigation, theme }) => {
  const { setUserToken } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(async (res) => {
          if (res.user.uid) {
            await AsyncStorage.setItem("userToken", res.user.uid);
            setUserToken(res.user.uid);
            ToastAndroid.show("Registration successfull", ToastAndroid.SHORT);
          }
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code === "auth/email-already-in-use") {
            ToastAndroid.show(
              "The email is already registered to an account",
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
            placeholder="mani@gmail.com"
            onBlur={() => formik.setFieldTouched("email")}
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
          />
        </InputMessageContainer>

        <InputMessageContainer>
          <InputMessage
            error={formik.errors.password}
            visible={formik.touched.password}
            color={theme.accentColor}
          />
          <AppInput
            icon="key"
            placeholder="corona2020"
            onBlur={() => formik.setFieldTouched("password")}
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
          />
        </InputMessageContainer>

        <Center>
          <AppButton title="Signup" onPress={formik.handleSubmit} />
        </Center>

        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <AppText color={theme.secondaryColor}>
            Already have an account?{" "}
          </AppText>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <AppText color={theme.accentColor}>Login</AppText>
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

const InputContainer = styled.ScrollView`
  width: 95%;
`;

const InputMessageContainer = styled.View`
  margin: 4px 0;
`;

export default withTheme(SignupScreen);
