import React, { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Button from "react-bootstrap/Button";

const AuthForm = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [errorData, setErrorData] = useState({
    errorCode: "",
    errorMessage: "",
  });

  const handleChange = (event) =>
    setAuthData({
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNewUser) {
      createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      ).catch(errorData);
    } else {
      signInWithEmailAndPassword(auth, authData.email, authData.password).catch(
        errorData
      );
    }

    const resetForm = () => {
      setAuthData({
        email: "",
        password: "",
      });
      setIsNewUser(true);
      setErrorData({
        error: "",
        errorMessage: "",
      });
    };

    const errorState = () => {
      setErrorData({
        error: errorData.errorCode,
        errorMessage: errorData.errorMessage,
      });
    };
  };

  const toggleSignUpOrLogIn = () => {
    setIsNewUser((state) => !state.isNewUser);
  };

  return (
    <div>
      <p>{isNewUser ? "Sign up with us" : "Log in to start"}</p>
      <form onSubmit={handleSubmit}>
        <span>Email</span>
        <input type="email" value={authData.email} onChange={handleChange} />
        <span>Password</span>
        <input
          type="password"
          value={authData.password}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value={isNewUser ? "Sign up" : "Log in"} />
        <br />
        <Button variant="link" onClick={toggleSignUpOrLogIn}>
          {isNewUser
            ? "Clicke here to Log in to your account"
            : "Click here to create an account with us"}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
