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

const POSTS_FOLDER_NAME = "posts";
const IMAGES_FOLDER_NAME = "images";

const Upload = (props) => {
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [imageLocationID, setImageLocationID] = useState("");

  const handleInputChange = (e) => {
    if (e.target.name === "caption") {
      setCaption(e.target.value);
    } else if (e.target.name === "imageFileName") {
      setImageFile(e.target.files[0]);
      setImageFileName(e.target.value);
    }
  };

  const updateLocation = (e) => {
    console.log(e);
    console.log(e[0].place_id);
    setImageLocation(e[0].description);
    setImageLocationID(e[0].place_id);
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
          authorEmail: props.loggedInUser.email,
          locationID: imageLocationID,
          locationName: imageLocation,
        });
        setImageFile(null);
        setImageFileName("");
        setCaption("");
      });
    });
  };

  return (
    <div>
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
        <ChooseLocation onUpdate={updateLocation} />
        <label>
          Caption:
          <input
            type="text"
            name="caption"
            value={caption}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Upload!" disabled={!caption} />
      </form>
    </div>
  );
};

export default Upload;
