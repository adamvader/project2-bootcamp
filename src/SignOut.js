import React, { useState } from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const UserSignOut = ({ loggedInUser }) => {
  const handleSignOut = (event) => {
    signOut(auth).then(() => {
      alert("Sign-out successful");
      // setLogOut(true);
    });
    /*     .then(resetForm)
    .catch(updateError); */
  };
  return (
    <input
      component={Link}
      to="/authform"
      type="button"
      onClick={handleSignOut}
      value="Sign Out here"
    />
  );
};

export default UserSignOut;
