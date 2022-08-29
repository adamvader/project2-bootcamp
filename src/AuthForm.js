import React, { useState } from "react";
import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";

const AuthForm = ({ loggedInUser }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errorData, setErrorData] = useState({
    errorCode: "",
    errorMessage: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuthData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(event.target.value);
  };

  const handleClickShowPassword = () => {
    setAuthData((prev) => ({
      ...prev,
      showPassword: !authData.showPassword,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetForm = () => {
    setAuthData({
      email: "",
      password: "",
    });
    setIsNewUser(false);
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
        .then(() => {
          alert("Account created!");
        })
        .then(resetForm)
        .catch(updateError);
    } else {
      signInWithEmailAndPassword(auth, authData.email, authData.password)
        .then(resetForm)
        .catch(updateError);
    }
  };

  const handleSignOut = (event) => {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
        // setLogOut(true);
      })
      .then(resetForm)
      .catch(updateError);
  };

  const toggleSignUpOrLogIn = () => {
    setIsNewUser((state) => !isNewUser);
  };

  return (
    <div>
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              /* marginTop: 1, */
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "Black",
              }}
            >
              <p>{!isNewUser ? "Sign in" : "Create account"}</p>
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={authData.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type={authData.showPassword ? "text" : "password"}
                name="password"
                value={authData.password}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {authData.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {!isNewUser ? "Sign In" : "Create account"}
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Button variant="text" onClick={toggleSignUpOrLogIn}>
                    {isNewUser
                      ? "Click here to Log in"
                      : "Click here to create an account"}
                  </Button>
                  {/*    <input
                  type="button"
                  onClick={handleSignOut}
                  value="Sign Out here"
                  disabled={!loggedInUser}
                /> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default AuthForm;
