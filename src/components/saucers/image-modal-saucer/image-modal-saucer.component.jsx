import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "100rem",
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: 600,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  images: {
    maxWidth: "100%",
    maxHeight: "100%",
    padding: "0.5rem",
  },
}));

export default function ImageModalSaucer({ urls, open, handleClose, setUrl }) {
  const classes = useStyles();
  const setParentUrl = (event) => {
    const url = event.target.id;
    const selectedUrl = urls.filter((item) => item.includes(url));
    setUrl(selectedUrl.shift());
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.paper} style={getModalStyle()}>
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            {urls &&
              urls.map((url) => (
                <GridListTile key={url}>
                  <img src={url} key={url} alt="" className={classes.images} />
                  <GridListTileBar
                    actionIcon={
                      <IconButton
                        className={classes.icon}
                        id={url}
                        onClick={setParentUrl}
                      >
                        <AddIcon id={url} />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
      </div>
    </Modal>
  );
}
