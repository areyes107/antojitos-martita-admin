import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa4Hb1lkozDWf5ZDEf4Ek1CW_xTgybPEg",
  authDomain: "antojitos-martita.firebaseapp.com",
  databaseURL: "https://antojitos-martita.firebaseio.com",
  projectId: "antojitos-martita",
  storageBucket: "antojitos-martita.appspot.com",
  messagingSenderId: "155362839496",
  appId: "1:155362839496:web:5fc267d70c43c101d04efd",
  measurementId: "G-24REGFF3PF",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
