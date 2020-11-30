import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapchap) => {
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
  }, []);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => props.navigation.navigate("UserDetailScreen", {
              userId: user.id
            }) }
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
