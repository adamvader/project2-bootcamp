import React, { useState } from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const UserSignOut = () => {
  const handleSignOut = (event) => {
    signOut(auth).then(() => {
      alert("Sign-out successful");
    });
    /*     .then(resetForm)
    .catch(updateError); */
  };
  return (
    <Button
      component={Link}
      to="/authform"
      type="button"
      onClick={handleSignOut}
      value="Sign Out here"
    >
      Sign Out
    </Button>
  );
};

export default UserSignOut;
