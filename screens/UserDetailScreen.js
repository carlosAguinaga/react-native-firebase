import React, { useEffect, useState } from "react";
import { View, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {

  const initialState = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }

  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  },[]);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate('UserList');  
  }

  const updateUser = async () => {
    const dbRef = firebase.db.collection('users').doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setUser(initialState);
    props.navigation.navigate('UserList');
  }

  const openConfirmateAlert = () => {
    Alert.alert('Remove The user', 'Are you sure', [
      { text: 'yes', onPress: () => deleteUser() },
      { text: 'no', onPress: () => console.log(false) }
    ] )
  }

  if (loading) {
    return(
      <View>
        <ActivityIndicator size="large" color="#9e9e9e"/>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGrup}>
        <TextInput
          placeholder="Names User"
          value={user.name}
          onChangeText={(value) => handleChangeText("name", value)}
          />
      </View>
      <View style={styles.inputGrup}>
        <TextInput
          placeholder="Email User"
          value={user.email}
          onChangeText={(value) => handleChangeText("email", value)}
          />
      </View>
      <View style={styles.inputGrup}>
        <TextInput
          placeholder="Phone User"
          value={user.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button color="#19AC52" title="Update User" onPress={() => updateUser()} />
      </View>
      <View>
        <Button color="#E37399" title="Delete User" onPress={() => openConfirmateAlert()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGrup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default UserDetailScreen;
