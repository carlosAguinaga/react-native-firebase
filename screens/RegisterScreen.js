import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import fb from "../database/firebase";

const RegisterScreen = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const saveNewUser = async (userID) => {
    console.log(userID);
    try {
      await fb.db.collection("users").doc(userID).set({
        contactos: {
          name: userID,
        }
      });
      // props.navigation.navigate('UserList');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const unsuscribe = fb.firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     props.navigation.replace("UserList");
    //   }
    // });

    // return () => {
    //   unsuscribe();
    // };
  }, []);

  const [textLogin, setTextLogin] = useState("");

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
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
        console.log(errorMessage);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(value) => handleChangeText("email", value)}
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={(value) => handleChangeText("password", value)}
        secureTextEntry={true}
      />
      <View>
        <Button title="Register user" onPress={() => userRegister()} />
      </View>
      <View>
        <Button
          title="Go to login"
          onPress={() => props.navigation.replace("LoginScreen")}
        />
      </View>
      <Text>{textLogin}</Text>
    </View>
  );
};

export default RegisterScreen;
