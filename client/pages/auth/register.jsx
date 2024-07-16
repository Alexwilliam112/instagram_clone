import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
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
import authStyles from "../../stylesheets/authStyles";
import { REGISTER_QUERY } from "../../queries/auths";
import { useMutation } from "@apollo/client";
import ErrorModal from "../../components/modal/errorModal";
import NotificationModal from "../../components/modal/notificationModal";
import ValidationModal from "../../components/modal/validationModal";

export default RegisterPage = ({ navigation }) => {
  const [errorObj, setErrorMessage] = useState("");
  const [errorToggle, setErrorToggle] = useState(false);
  const [notifToggle, setNotifToggle] = useState(false);
  const [validationToggle, setValidationToggle] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [fnDispatch] = useMutation(REGISTER_QUERY, {
    onCompleted: async () => {
      setNotifToggle(true);
      setEmail('')
      setPassword('')
      setUsername('')
      setName('')
      setTimeout(() => {
        navigation.navigate('loginpage')
      }, 1000);
    },

    onError: (error) => {
      setErrorMessage(error);
      setErrorToggle(true);
    },
  });

  const handleRegister = async () => {
    if (!email || !password || !name || !username) {
      setValidationToggle(true);
      return;
    }

    await fnDispatch({
      variables: {
        input: {
          username,
          password,
          email,
          name,
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
              placeholder="Fullname"
              placeholderTextColor="#888"
              style={authStyles.input}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#888"
              style={authStyles.input}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Email address"
              placeholderTextColor="#888"
              style={authStyles.input}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              style={authStyles.input}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={authStyles.button}
              onPress={handleRegister}
            >
              <Text style={authStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={authStyles.blockx}></View>
            <View style={authStyles.loginContainer}>
              <View style={authStyles.orContainer}>
                <View style={authStyles.orLine} />
                <Text style={authStyles.orText}>OR</Text>
                <View style={authStyles.orLine} />
              </View>
              <View style={authStyles.haveAccountContainer}>
                <Text style={authStyles.signupText}>
                  Already have an account?
                </Text>
              </View>
              <TouchableOpacity
                style={authStyles.button2}
                onPress={() => {
                  navigation.navigate("loginpage");
                }}
              >
                <Text style={authStyles.buttonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </ScrollView>

      <ErrorModal
        modalVisible={errorToggle}
        setModalVisible={setErrorToggle}
        errorObj={errorObj}
      />

      <NotificationModal
        modalVisible={notifToggle}
        setModalVisible={setNotifToggle}
        modalTitle={'Sign Up Complete'}
        message={"Account Created! Please Log In"}
      />

      <ValidationModal
        modalVisible={validationToggle}
        setModalVisible={setValidationToggle}
      />
    </KeyboardAvoidingView>
  );
};
