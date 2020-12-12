import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import fb from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  const logout = () => {
    fb.firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("Salio de sesión");
        props.navigation.replace("LoginScreen");
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const getList = (userID) => {
    fb.db
      .collection("users")
      .doc(userID)
      .collection("contacts")
      .onSnapshot((querySnapchap) => {

        const users = [];

        querySnapchap.docs.forEach((doc) => {
          const { name, email, phone } = doc.data();
  
          users.push({
            id: doc.id,
            name,
            phone,
            email,
          });
        });
        setUsers(users);

      });
  };

  useEffect(() => {
    const unsuscribe = fb.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getList(user.uid);
      }
    });

    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />
      <Button title="logout" onPress={logout} />
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() =>
              props.navigation.navigate("UserDetailScreen", {
                contactId: user.id,
              })
            }
          >
            <ListItem.Chevron />
            <Avatar
              rounded
              source={{
                uri:
                  "https://www.photoworkx.nl/wp-content/uploads/2019/11/13x195cm_DSC4942-200x300.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UsersList;
