import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAy8CbeeLGHR8E9Bf-vqlCMZsUXg1-D0Eo",
  authDomain: "react-native-firebase-838f4.firebaseapp.com",
  databaseURL: "https://react-native-firebase-838f4.firebaseio.com",
  projectId: "react-native-firebase-838f4",
  storageBucket: "react-native-firebase-838f4.appspot.com",
  messagingSenderId: "1049969366371",
  appId: "1:1049969366371:web:ca5ffc5d8c59982d8c2f56"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};

