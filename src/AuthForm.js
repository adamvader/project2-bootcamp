import React, { useState } from "react";
import { auth } from "./Firebase";
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

  const handleChange = (event) => {
    setAuthData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(event.target.value);
  };

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

  const updateError = (error) => {
    setErrorData({
      errorCode: error.code,
      errorMessage: error.message,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNewUser) {
      createUserWithEmailAndPassword(auth, authData.email, authData.password)
        .then(resetForm)
        .catch(updateError);
    } else {
      signInWithEmailAndPassword(auth, authData.email, authData.password)
        .then(resetForm)
        .catch(updateError);
    }
  };

  const toggleSignUpOrLogIn = () => {
    setIsNewUser((state) => !isNewUser);
  };

  return (
    <div>
      <p>{isNewUser ? "Sign up with us" : "Log in to start"}</p>
      <form onSubmit={handleSubmit}>
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={authData.email}
          onChange={handleChange}
        />
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={authData.password}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value={isNewUser ? "Sign up" : "Log in"} />
        <br />
        <Button variant="link" onClick={toggleSignUpOrLogIn}>
          {isNewUser
            ? "Click here to Log in to your account"
            : "Click here to create an account with us"}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
