import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthForm from "./AuthForm";
import Upload from "./Upload";
import NewsFeed from "./NewsFeed";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import LocPage from "./LocationPage";

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

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
        <LocPage />
        <br />
        <AuthForm loggedInUser={loggedInUser} />
        <Upload loggedInUser={loggedInUser} />
        <div className="NewsFeed">
          <NewsFeed />
        </div>
        <NavBar />
      </header>
    </div>
  );
};

export default App;
