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
    <div>
      <Link to="authform">Create Account Or Sign In</Link>
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
        <LocPage />
        <br />
        <Routes>
          <Route path="/" element={newsfeed} />
          <Route path="/authform" element={authForm} />
          <Route
            path="/upload"
            element={<Upload loggedInUser={loggedInUser} />}
          />
        </Routes>
        {loggedInUser && <NavBar />}
      </header>
    </div>
  );
};

export default App;
