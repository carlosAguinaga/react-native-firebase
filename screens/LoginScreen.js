import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import fb from "../database/firebase";

const LoginScreen = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [textLogin, setTextLogin] = useState("");

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const goToRegister = ()=> {
    props.navigation.replace("RegisterScreen");
  }

  const loginUser = () => {
    fb.firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((user) => {
        // Signed in
        props.navigation.replace("UserList");
        
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setTextLogin(errorMessage);
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
        <Button title="Login" onPress={() => loginUser()} />
      </View>
      <View>
        <Button title="register" onPress={goToRegister} />
      </View>
      <Text>{textLogin}</Text>
    </View>
  );
}

export default  LoginScreen;
