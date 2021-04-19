import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import "./login.styles.css";

const useStyles = (theme) => ({
  container: {
    height: "calc(100vh - 64px)",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-100px",
    minHeight: "20vh",
  },
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
    backgroundColor: "#67bfb1",
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
      this.props.history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <h2>Sign In with Email and Password</h2>

          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              name="email"
              value={this.state.email}
              required
              type="email"
              onChange={this.handleChange}
              label="email"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              name="password"
              value={this.state.password}
              type="password"
              required
              onChange={this.handleChange}
              label="password"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              autoFocus
            />
            <div className="buttons">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                autoFocus
                className={classes.submit}
              >
                {" "}
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Login));
