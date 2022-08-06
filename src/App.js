import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthForm from "./AuthForm";
import UserRating from "./Rating";
import Upload from "./Upload";
import NewsFeed from "./NewsFeed";
import SearchBar from "./SearchBar";

const App = () => {
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

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
        <AuthForm loggedInUser={loggedInUser} />
        <UserRating />
        <Upload loggedInUser={loggedInUser} />
        <NewsFeed />
      </header>
    </div>
  );
};

export default App;
