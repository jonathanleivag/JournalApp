import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7YgPW_RNEZDHNPHUQfyiwSSeznBMVQWg",
  authDomain: "react-aprendiendo.firebaseapp.com",
  databaseURL: "https://react-aprendiendo.firebaseio.com",
  projectId: "react-aprendiendo",
  storageBucket: "react-aprendiendo.appspot.com",
  messagingSenderId: "764066866837",
  appId: "1:764066866837:web:5b6b5691c7e1f174139d9c",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
