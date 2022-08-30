import React from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const UserSignOut = () => {
  const navigate = useNavigate();
  const handleSignOut = (event) => {
    signOut(auth).then(() => {
      alert("Sign-out successful");
    });
    /*     .then(resetForm)
    .catch(updateError); */
    navigate("/");
  };
  return (
    <Button type="button" onClick={handleSignOut} variant="contained">
      Sign Out
    </Button>
  );
};

export default UserSignOut;
