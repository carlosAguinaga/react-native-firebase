import React, { useEffect } from "react";
import { View, Text } from "react-native";
import fb from "../database/firebase";

const LoadingScreen = (props) => {
  useEffect(() => {
    const unsuscribe = fb.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.navigation.replace("UserList");
      } else {
        props.navigation.replace("LoginScreen");
      }
    });

    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
