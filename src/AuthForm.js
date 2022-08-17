import React, { useState } from "react";
import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ loggedInUser }) => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [errorData, setErrorData] = useState({
    errorCode: "",
    errorMessage: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  // const [logOut, setLogOut] = useState(true);

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
    navigate("/");
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
        // .then(setLogOut(false))
        .then(resetForm)
        .catch(updateError);
    } else {
      signInWithEmailAndPassword(auth, authData.email, authData.password)
        // .then(setLogOut(false))
        .then(resetForm)
        .catch(updateError);
    }
  };

  /*   const handleForgetSubmit = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, authData.email)
      .then(() => {
        alert("Email sent!");
      })
      .then(resetForm)
      .catch(updateError);
  }; */

  const handleSignOut = (event) => {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
        // setLogOut(true);
      })
      .then(resetForm)
      .catch(updateError);
  };

  // click forget password
  // Change to the forget password form
  // user to input email, new password and confirm password
  // when 2 password fields are same, press submit to change password, else error
  // upon submit, show password change successfull

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
        <br />
        <input
          type="button"
          onClick={handleSignOut}
          value="Sign Out here"
          disabled={!loggedInUser}
        />

        {/*        <Button variant="link" onClick={handleForgetSubmit}>
          {}
        </Button> */}
      </form>
    </div>
  );
};

export default AuthForm;
