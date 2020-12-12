import React, { useEffect } from "react";
import { View, Text } from "react-native";
import fb from "../database/firebase";

const LoadingScreen = ( props ) => {

  // const auth = fb.firebase.auth

  useEffect(() => {
    const unsuscribe = fb.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('si auth')
        props.navigation.replace("UserList")
      } else {
        console.log('no auth')
        props.navigation.replace("LoginScreen")
      }
    });

    return ()=> {
      unsuscribe();
    }

  }, []);



  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
