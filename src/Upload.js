import React, { useEffect, useState } from "react";
import { push, ref as databaseRef, set } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "./Firebase";
import "./App.css";

const POSTS_FOLDER_NAME = "posts";
const IMAGES_FOLDER_NAME = "images";

const Upload = () => {
  const [inputTextValue, setInputTextValue] = useState("");
  const [fileInputFile, setFileInputFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");

  const handleInputChange = (e) => {
    if (e.target.name === "inputTextValue") {
      setInputTextValue(e.target.value);
    } else if (e.target.name === "fileInputFile") {
      setFileInputFile(e.target.value);
    } else if (e.target.name === "fileInputValue") {
      setFileInputValue(e.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fileRef = storageRef(
      storage,
      `${IMAGES_FOLDER_NAME}/${fileInputFile.name}`
    );

    uploadBytes(fileRef, fileInputFile).then(() => {
      getDownloadURL(fileRef).then((downloadUrl) => {
        const messagesListRef = databaseRef(database, POSTS_FOLDER_NAME);
        const newMessagesRef = push(messagesListRef);
        set(newMessagesRef, {
          imageLink: downloadUrl,
          text: inputTextValue,
          authorEmail: loggedInUser.email,
        });
        setFileInputFile(null);
        setFileInputValue("");
        setInputTextValue("");
      });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>{loggedInUser ? loggedInUser.email : null}</p>
        <label>
          Upload:
          <input
            type="file"
            value={fileInputValue}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            value={inputTextValue}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Upload!" disabled={!inputTextValue} />
      </form>
    </div>
  );
};

export default Upload;
