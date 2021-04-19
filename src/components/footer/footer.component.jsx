import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "#777" }}>
      {"Copyright © "}
      {new Date().getFullYear()}
      {". "}
      Antojitos Martita.{" "}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // minHeight: '100vh',
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "#67bfb1",
    color: "#777",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1"> Made with ❤️ by Angel Reyes.</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
