import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthForm from "./AuthForm";
import UserRating from "./Rating";
import Upload from "./Upload";
import NewsFeed from "./NewsFeed";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser((prev) => ({ ...prev, loggedInUser: user }));
      } else {
        setLoggedInUser((prev) => ({ ...prev, loggedInUser: null }));
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <AuthForm />
        <UserRating />
        <Upload />
        <NewsFeed />
      </header>
    </div>
  );
};

export default App;
