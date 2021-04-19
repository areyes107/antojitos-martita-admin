import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "#67bfb1",
  },
  logoImg: {
    float: "left",
    height: "50px",
    width: "100px",
  },
  adminText: {
    fontSize: "105%",
    marginLeft: "0.8rem",
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <h2>Antojitos Martita </h2>
          <p className={classes.adminText}>
            {" "}
            <b> ADMIN</b>
          </p>
        </Toolbar>
      </AppBar>
    </div>
  );
}
