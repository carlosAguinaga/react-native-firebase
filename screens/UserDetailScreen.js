import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [contact, setContact] = useState(initialState);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsuscribe = firebase.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        getContactById(props.route.params.contactId, user.uid);
      }
    });

    return () => {
      unsuscribe();
    };
  }, []);

  const getContactById = async (contactId, userId) => {
    const dbRef = firebase.db
      .collection("users")
      .doc(userId)
      .collection("contacts")
      .doc(contactId);
    const doc = await dbRef.get();
    const contact = doc.data();
    setContact({
      ...contact,
      id: doc.id,
    });
    setLoading(false);
  };

  const handleChangeText = (name, value) => {
    setContact({ ...contact, [name]: value });
  };

  const deleteUser = async (contactId, userId) => {
    const dbRef = firebase.db
      .collection("users")
      .doc(userId)
      .collection("contacts")
      .doc(contactId);
    console.log(dbRef);
    await dbRef.delete();
    props.navigation.navigate("UserList");
  };

  const updateUser = async (contactId, userId) => {
    const dbRef = firebase.db
      .collection("users")
      .doc(userId)
      .collection("contacts")
      .doc(contactId);
    await dbRef.set({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
    setContact(initialState);
    props.navigation.navigate("UserList");
  };

  const openConfirmateAlert = (contactId, userId) => {
    Alert.alert("Remove The user", "Are you sure", [
      { text: "yes", onPress: () => deleteUser(contactId, userId) },
      { text: "no", onPress: () => console.log(false) },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.inputGrup}>
        <TextInput
          placeholder="Names User"
          value={contact.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGrup}>
        <TextInput
          placeholder="Email User"
          value={contact.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGrup}>
        <TextInput
          placeholder="Phone User"
          value={contact.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          color="#2c8add"
          title="Update User"
          onPress={() => updateUser(contact.id, userId)}
        />
      </View>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => openConfirmateAlert(contact.id, userId)}
      >
        <Text style={styles.textColor}>Delete User</Text>
      </TouchableOpacity>
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
  buttonView: {
    marginBottom: 15,
  },
  secondaryButton: {
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#2c8add",
  },
  textColor: {
    color: "#2c8add",
  },
});

export default UserDetailScreen;
