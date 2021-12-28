import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./Login.css";

import { withStyles } from "@material-ui/core/styles";
function Login() {
    const login = () => {
        // TODO ログイン処理
        window.location.href = "/";
    }

  const CssTextField = withStyles({
    root: {
      "& label.MuiFormLabel-root": {
        color: "white",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
      },
    },
  })(TextField);
  return (
    <div>
      <div className="body"></div>
      <div className="grad"></div>
      <Container maxWidth="sm">
        <Grid
          container
          direction="row"
          justifycontent="center"
          alignItems="center"
          style={{ height: "100vh" }}
          className="z1"
        >
          <Grid item xs={6} className="app_title z1">
            <div>
              Z<span>atta</span>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <CssTextField
                  label="username"
                  variant="outlined"
                  className="column"
                />
              </Grid>
              <Grid item xs>
                <CssTextField
                  id="password"
                  label="password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  className="column"
                />
              </Grid>
              <Grid item xs>
                <Button variant="contained" id="login" className="column" onClick={login}>
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  id="signup"
                  className="column"
                >
                  新規登録
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Login;
