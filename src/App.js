import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer.component";
import InsideNavbar from "./components/inside-navbar/inside-navbar.component";
import Navbar from "./components/navbar/navbar.component";
import AddSaucer from "./components/saucers/add-saucer/add-saucer.component";
import UpdateSaucer from "./components/saucers/update-saucer/update-saucer.component";
import firebase from "./firebase/firebase.utils";
import Home from "./pages/home/home.component";
import Login from "./pages/login/login.component";
import Saucers from "./pages/saucers/saucers.component";

const theme = createMuiTheme();

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  const isInitialized = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(resolve);
    });
  };

  useEffect(() => {
    isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  const MainApp = withRouter(({ location }) => {
    return (
      <div>
        {location.pathname === "/login" && <Navbar />}

        {(location.pathname === "/home" ||
          location.pathname === "/" ||
          location.pathname === "/saucers" ||
          location.pathname === "/addSaucers" ||
          location.pathname === "/updateSaucer") && <InsideNavbar />}
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/saucers" component={Saucers} />
        <Route exact path="/addSaucers" component={AddSaucer} />
        <Route exact path="/updateSaucer" component={UpdateSaucer} />
        {(location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/home") && <Footer />}
      </div>
    );
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <MainApp />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
