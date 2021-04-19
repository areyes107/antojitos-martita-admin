import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase/firebase.utils";
import "./home.styles.css";

const Home = () => {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        console.log("User not logged in");
        history.push("/login");
      } else {
        console.log("User logged in");
      }
    });
    // eslint-disable-next-line
  }, []);

  return <div> HOME</div>;
};

export default Home;
