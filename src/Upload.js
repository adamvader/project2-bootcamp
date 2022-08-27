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
      <form onSubmit={handleSubmit}>
        <p>{props.loggedInUser ? props.loggedInUser.email : null}</p>
        <label>
          Upload:
          <input
            type="file"
            name="imageFileName"
            value={imageFileName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Name of Beer:
          <input
            type="text"
            name="caption"
            value={caption}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Comment:
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <ChooseLocation onUpdate={updateLocation} />
        <UserRating onUpdate={updateRating} />
        <input type="submit" value="Upload!" disabled={!caption} />
      </form>
    </div>
  );
};

export default Upload;
