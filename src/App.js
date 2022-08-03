import React from "react";
import logo from "./logo.png";
import "./App.css";
import AuthForm from "./AuthForm";
import UserRating from "./Rating";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <AuthForm />
          <UserRating />
        </header>
      </div>
    );
  }
}

export default App;