import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import fb from "../database/firebase";

const RegisterScreen = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [textError, setTextError] = useState("");

  const goToLogin = () => {
    props.navigation.replace("LoginScreen");
  };

  const saveNewUser = async (userID) => {
    try {
      await fb.db
        .collection("users")
        .doc(userID)
        .set({
          user: {
            id: userID,
          },
        });
    } catch (error) {}
  };

  useEffect(() => {}, []);

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
    if (value === "") {
      setTextError("");
    }
  };

  const userRegister = () => {
    fb.firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((userCredential) => {
        // Signed in
        saveNewUser(userCredential.user.uid);
        props.navigation.replace("UserList");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setTextError(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ContactAPP</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          onChangeText={(value) => handleChangeText("password", value)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={userRegister}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.errorView}>
        <Text style={styles.errorText}>{textError}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f3436",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#2c8add",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#2c8add",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  errorView: {
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    color: "#f06577",
  },
});

export default RegisterScreen;
