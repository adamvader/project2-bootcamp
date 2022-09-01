import React, { useState } from "react";
import { push, ref as databaseRef, set } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "./Firebase";
import "./App.css";
import ChooseLocation from "./ChooseLocation";
import UserRating from "./Rating";
import { useNavigate } from "react-router-dom";
import HandleSignOut from "./SignOut";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "./bestsellers.png";

// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const theme = createTheme();
const POSTS_FOLDER_NAME = "posts";
const IMAGES_FOLDER_NAME = "images";

const Upload = (props) => {
  const [caption, setCaption] = useState("");
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [imageLocationID, setImageLocationID] = useState("");
  const [imageRating, setImageRating] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.name === "caption") {
      setCaption(e.target.value);
    } else if (e.target.name === "imageFileName") {
      setImageFile(e.target.files[0]);
      setImageFileName(e.target.value);
    } else if (e.target.name === "comment") {
      setComment(e.target.value);
    }
  };

  const updateLocation = (e) => {
    console.log(e);
    console.log(e.place_id);
    setImageLocation(e.description);
    setImageLocationID(e.place_id);
  };

  const updateRating = (e) => {
    console.log(e);
    setImageRating(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fileRef = storageRef(
      storage,
      `${IMAGES_FOLDER_NAME}/${imageFile.name}`
    );

    uploadBytes(fileRef, imageFile).then(() => {
      getDownloadURL(fileRef).then((downloadUrl) => {
        const postsListRef = databaseRef(database, POSTS_FOLDER_NAME);
        const newPostRef = push(postsListRef);
        set(newPostRef, {
          imageLink: downloadUrl,
          caption: caption,
          comment: comment,
          authorEmail: props.loggedInUser.email,
          locationID: imageLocationID,
          locationName: imageLocation,
          rating: imageRating,
        });
        setImageFile(null);
        setImageFileName("");
        setCaption("");
        setComment("");
      });
    });
    navigate("/");
  };

  return (
    <div className="Upload">
      <img id="logo-app" src={Logo} alt="Bestsellers logo" />
      <div className="UserAndLogOut">
        <div className="Ava-User">
          {props.loggedInUser ? (
            <Avatar sx={{ width: 28, height: 28 }} />
          ) : null}
          <span className="Upload-User">
            {props.loggedInUser ? props.loggedInUser.email : null}
          </span>
        </div>
        <div className="SignOut">
          <HandleSignOut />
        </div>
      </div>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "Black",
              mb: 3,
            }}
          >
            New post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            /* justifyContent="left" */
          >
            <Button variant="contained" component="label" fullWidth>
              <AddIcon />
              <input
                type="file"
                name="imageFileName"
                value={imageFileName}
                onChange={handleInputChange}
              />
            </Button>

            <ChooseLocation onUpdate={updateLocation} />
            <UserRating onUpdate={updateRating} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="caption"
              label="Name of Beer"
              name="caption"
              autoFocus
              value={caption}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={2}
              id="comment"
              label="Comment"
              name="comment"
              value={comment}
              onChange={handleInputChange}
              InputProps={{ sx: { height: 90 } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Upload!
            </Button>
          </Box>
        </Box>
      </Container>
      {/* </ThemeProvider> */}
    </div>
  );
};

export default Upload;
