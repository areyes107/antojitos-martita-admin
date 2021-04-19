import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase/firebase.utils";

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "absolute",
    marginBottom: "5rem",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    backgroundColor: "#67bfb1",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 6,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 2,
  },
  logoImg: {
    float: "left",
    "&:hover": {
      borderRadius: "5px",
      borderLeft: "solid 1px #FFFFFF",
      borderBottom: "solid 1px #FFFFFF",
    },
  },
  adminText: {
    fontSize: "105%",
    marginLeft: "11rem",
    marginTop: "1.7rem",
  },
  formControl: {
    minWidth: 200,
  },
}));
const InsideNavbar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const returnHome = () => {
    history.push("/home");
  };

  const handleCloseSaucers = () => {
    setAnchorEl(null);
    history.push("/saucers");
  };

  const handleCloseCombos = () => {
    setAnchorEl(null);
    history.push("/combos");
  };

  const handleCloseFamiliarCombos = () => {
    setAnchorEl(null);
    history.push("/familiarCombos");
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sign in out");
        history.push("/login");
      });
  };

  return (
    <div className={classes.root} style={{}}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <div>
            <Button
              edge="start"
              color="inherit"
              aria-label="open drawer"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </Button>
            <Menu
              getContentAnchorEl={null}
              elevation={0}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleCloseSaucers}>Saucers</MenuItem>
              <MenuItem onClick={handleCloseCombos}>Combos</MenuItem>
              <MenuItem onClick={handleCloseFamiliarCombos}>
                Familiar Combos
              </MenuItem>
            </Menu>
          </div>

          <div className={classes.title} nowrap="true">
            <h2 className={classes.logoImg} onClick={returnHome}>
              {" "}
              Antojitos Martita
            </h2>
            <p className={classes.adminText}>
              <b> ADMIN</b>
            </p>
          </div>
          <IconButton color="inherit" onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default InsideNavbar;
