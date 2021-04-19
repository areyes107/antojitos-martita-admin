import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase/firebase.utils";
import ImageModalSaucer from "../image-modal-saucer/image-modal-saucer.component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "absolute",
    marginLeft: "10px",
  },
  content: {
    display: "flex",
    marginTop: "70px",
    marginLeft: "30px",
    width: "100%",
  },
  form: {
    display: "flex",
    width: "100%",
  },
  textField: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  saveButton: {
    color: "white",
    backgroundColor: "green",
  },
  data: {
    maxWidth: "36rem",
    margin: "1rem",
  },
  selectButton: {
    marginLeft: "1rem",
  },
  selectedImage: {
    width: "100px",
    borderRadius: "5px",
  },
}));

const AddSaucer = () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .firestore()
      .collection("saucers")
      .add({
        name,
        description,
        ingredients,
        price,
        photoUrl,
      })
      .then(
        () => setName(""),
        setDescription(""),
        setIngredients(""),
        setPrice(""),
        setPhotoUrl("")
      );
    history.push("/saucers");
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

  const formulateUrl = async (item) => {
    const location = item["_delegate"]["_location"];
    const ref = firebase.storage().ref(location["path_"]);
    let url = await ref.getDownloadURL();
    return url;
  };

  const handleProgress = (progress) => {
    if (progress < 100) {
      setUploaded(true);
    } else if (progress === 100) {
      setUploaded(false);
    }
  };

  const handleUploadSuccess = (_filename) => {
    setUploadedSuccess(true);
  };

  const handleOnClose = (event) => {
    setUploadedSuccess(false);
  };

  const handleClose = (_e) => {
    const _isModalOpen = isModalOpen;
    setIsModalOpen(!_isModalOpen);
  };

  const setLogoUrl = (url) => {
    setPhotoUrl(url);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.data}>
            <TextField
              className={classes.textField}
              value={name}
              label="Name"
              name="name"
              onChange={(e) => setName(e.currentTarget.value)}
              fullWidth
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              className={classes.textField}
              value={description}
              name="description"
              label="Description"
              onChange={(e) => setDescription(e.currentTarget.value)}
              fullWidth
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              className={classes.textField}
              value={ingredients}
              name="ingredients"
              label="Ingredients"
              onChange={(e) => setIngredients(e.currentTarget.value)}
              fullWidth
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              className={classes.textField}
              value={price}
              label="Price"
              name="price"
              onChange={(e) => setPrice(e.currentTarget.value)}
              fullWidth
              variant="outlined"
              size="small"
              type="number"
              margin="normal"
            />
            <CustomUploadButton
              accept="image/*"
              name="logo"
              storageRef={firebase.storage().ref("saucers")}
              randomizeFilename
              onProgress={handleProgress}
              onUploadSuccess={handleUploadSuccess}
              className="MuiButton-root MuiButton-containedPrimary MuiButton-contained MuiButtonBase-root uploadButton"
            >
              Upload Image
            </CustomUploadButton>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              className={classes.selectButton}
            >
              Select Logo
            </Button>

            <ImageModalSaucer
              urls={images}
              handleClose={handleClose}
              open={isModalOpen}
              setUrl={setLogoUrl}
            />
            {uploaded && <CircularProgress />}
            <br />
            <br />
            <img src={photoUrl} alt="" className={classes.selectedImage} />
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              className={classes.saveButton}
            >
              Save
            </Button>
            <Snackbar
              open={uploadedSuccess}
              autoHideDuration={2000}
              onClose={handleOnClose}
            >
              <MuiAlert severity="success">File Uploaded</MuiAlert>
            </Snackbar>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddSaucer;
