import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthForm from "./AuthForm";
import Upload from "./Upload";
import NewsFeed from "./NewsFeed";
import NavBar from "./NavBar";
import LocPage from "./LocationPage";
import { Routes, Route, Link } from "react-router-dom";
import Logo from "./bestsellers.png";
import Button from "@mui/material/Button";

const App = ({ onLoadSubmit, LocName, LocPic }) => {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
        return;
      } else {
        setLoggedInUser(null);
      }
    });
  }, []);

  const authForm = <AuthForm loggedInUser={loggedInUser} />;
  const createAccountOrSignIn = (
    <div className="firstPage">
      <img id="logo" src={Logo} alt="Bestsellers logo" />
      <Button component={Link} to="authform">
        Create Account Or Sign In
      </Button>
    </div>
  );
  const newsfeed = (
    <div className="UploadAndNewsFeed">
      {loggedInUser ? <NewsFeed /> : createAccountOrSignIn}
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={newsfeed} />
          <Route path="/authform" element={authForm} />

          <Route
            path="/upload"
            element={<Upload loggedInUser={loggedInUser} />}
          />
          <Route path="/search" element={<LocPage />} />
        </Routes>
        {loggedInUser && <NavBar />}
      </header>
    </div>
  );
};

export default App;
