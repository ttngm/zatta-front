import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./Login.css";
import { withStyles } from "@material-ui/core/styles";

function LoginForm() {
  const login = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(username);

    // TODO ログイン処理
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result == "true") {
            window.location.href = "/";
          } else {
            console.log("ログイン失敗");
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  };

  const CssTextField = withStyles({
    root: {
      "& .MuiInputBase-input": {
        color: "white",
      },
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
    <Grid item xs container direction="column" spacing={1}>
      <Grid item xs>
        <CssTextField
          id="username"
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
        <Button
          variant="contained"
          id="login"
          className="column"
          onClick={() => login()}
        >
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
  );
}

export default LoginForm;
