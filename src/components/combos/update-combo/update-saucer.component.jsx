import { Button, InputLabel, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "../../../firebase/firebase.utils";
import ImageModalSaucer from "../image-modal-combo/image-modal-combo.component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "absolute",
  },
  content: {
    marginLeft: "3rem",
  },
  form: {
    display: "flex",
    flexBasis: "100%",
    justifyContent: "left",
    width: "100%",
  },
  saucerData: {
    width: "30%",
    margin: "0.1rem",
  },
  image: {
    width: "150px",
    borderRadius: "5px",
  },
  imageContainer: {
    marginBottom: "0.5rem",
    marginTop: "0.5rem",
  },
  updateButton: {
    backgroundColor: "green",
    color: "white",
    marginRight: "0.5rem",
  },
}));

function UpdateSaucer() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const [images, setImages] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");

  const id = location.state.id;
  const [data, setData] = useState("");

  const returnToSaucers = () => {
    history.push("/saucers");
  };

  const getData = async (id) => {
    try {
      const userRef = await firebase
        .firestore()
        .collection("saucers")
        .doc(id)
        .get();
      const snapshot = userRef.data();
      return snapshot;
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (id) => {
    try {
      const userRef = await firebase
        .firestore()
        .collection("saucers")
        .doc(id)
        .update({
          ...data,
          photoUrl: photoUrl,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData(location.state.id);
    history.push("/saucers");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    setLogoUrl(data.logo_url);
    getData(id).then((user) => setData(user));
  }, [id]);

  const handleClose = (_e) => {
    const _isModalOpen = isModalOpen;
    setIsModalOpen(!_isModalOpen);
  };

  const formulateUrl = async (item) => {
    const location = item["_delegate"]["_location"];
    const ref = firebase.storage().ref(location["path_"]);
    let url = await ref.getDownloadURL();
    return url;
  };

  useEffect(() => {
    async function CreateUrl() {
      const rawData = await firebase.storage().ref("saucers").listAll();

      const urls = await Promise.all(
        rawData.items.map((item) => formulateUrl(item))
      );

      setImages(urls);
    }
    CreateUrl();
  }, []);

  const setLogoUrl = (url) => {
    console.log(url);
    setPhotoUrl(url);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <h1 style={{ textAlign: "center" }}>Update Saucers</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.saucerData}>
            <label htmlFor="Update Saucer">Saucer Data:</label>
            <br />
            <br />
            <div>
              <InputLabel> Id</InputLabel>
              <TextField
                size="small"
                variant="outlined"
                value={location.state.id}
                className={classes.textField}
                margin="normal"
                fullWidth
                disabled={true}
                autoFocus={false}
              />
            </div>
            <div>
              <InputLabel> Name</InputLabel>
              <TextField
                size="small"
                id="name"
                variant="outlined"
                name="name"
                value={data.name}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
                fullWidth
                autoFocus={false}
              />
            </div>
            <div>
              <InputLabel> Description</InputLabel>
              <TextField
                size="small"
                id="description"
                variant="outlined"
                name="description"
                value={data.description}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
                fullWidth
                autoFocus={false}
              />
            </div>
            <div>
              <InputLabel> Ingredients</InputLabel>
              <TextField
                size="small"
                id="ingredients"
                variant="outlined"
                name="ingredients"
                value={data.ingredients}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
                fullWidth
                autoFocus={false}
              />
            </div>
            <div>
              <InputLabel> Price</InputLabel>
              <TextField
                size="small"
                id="price"
                variant="outlined"
                name="price"
                value={data.price}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
                fullWidth
                type="number"
                autoFocus={false}
              />
            </div>
            <div>
              <InputLabel> Image</InputLabel>
              <div className={classes.imageContainer}>
                <img
                  src={photoUrl ? photoUrl : data.photoUrl}
                  alt=""
                  className={classes.image}
                />
              </div>
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.selectButton}
              onClick={handleClose}
              onChange={handleChange}
            >
              Update Logo
            </Button>

            <ImageModalSaucer
              urls={images}
              handleClose={handleClose}
              open={isModalOpen}
              setUrl={setLogoUrl}
            />
            <br />
            <br />

            <Button
              variant="contained"
              type="submit"
              className={classes.updateButton}
            >
              Update
            </Button>
            <Button variant="contained" onClick={returnToSaucers}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSaucer;
