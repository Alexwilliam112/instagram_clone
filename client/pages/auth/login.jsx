import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useMutation } from "@apollo/client";
import { LOGIN_QUERY } from "../../queries/auths";

import { AuthContext } from "../../contexts/authContext";
import * as SecureStore from "expo-secure-store";
import authStyles from "../../stylesheets/authStyles";
import ErrorModal from "../../components/modal/errorModal";
import ValidationModal from "../../components/modal/validationModal";

export default LoginPage = ({ navigation }) => {
  const { setValidAuth } = useContext(AuthContext);

  const [errorObj, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [validationToggle, setValidationToggle] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fnDispatch] = useMutation(LOGIN_QUERY, {
    onCompleted: async (res) => {
      let token = null;
      let username;
      let userId;

      if (res && res.HandleLogin && res.HandleLogin.access_token) {
        token = res?.HandleLogin?.access_token;
        username = res?.HandleLogin?.username;
        userId = res?.HandleLogin?.userId;
      }

      await SecureStore.setItemAsync("token", token);
      await SecureStore.setItemAsync("username", username);
      await SecureStore.setItemAsync("userId", userId);

      setValidAuth(true);
    },

    onError: (error) => {
      setErrorMessage(error);
      setModalVisible(true);
    },
  });

  const handleLogin = async () => {
    if (!username || !password) {
      setValidationToggle(true);
      return;
    }

    await fnDispatch({
      variables: {
        input: {
          username,
          password,
        },
      },
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LinearGradient
            colors={["#1f1f1f", "#24243e", "#2b2b2b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={authStyles.container}
          >
            <Image
              source={require("../../assets/Instagram_icon.png")}
              style={authStyles.logo}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#888"
              style={authStyles.input}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              style={authStyles.input}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={authStyles.button} onPress={handleLogin}>
              <Text style={authStyles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <Text style={authStyles.forgotPassword}>Forgot password?</Text>
            <View style={authStyles.orContainer}>
              <View style={authStyles.orLine} />
              <Text style={authStyles.orText}>OR</Text>
              <View style={authStyles.orLine} />
            </View>
            <View style={authStyles.signupContainer}>
              <View style={authStyles.loginContainer}>
                <View style={authStyles.haveAccountContainer}>
                  <Text style={authStyles.signupText}>
                    Don't have an account?
                  </Text>
                </View>
                <TouchableOpacity
                  style={authStyles.button2}
                  onPress={() => {
                    navigation.navigate("registerpage");
                  }}
                >
                  <Text style={authStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </ScrollView>

      <ErrorModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        errorObj={errorObj}
      />

      <ValidationModal
        modalVisible={validationToggle}
        setModalVisible={setValidationToggle}
      />
    </KeyboardAvoidingView>
  );
};
