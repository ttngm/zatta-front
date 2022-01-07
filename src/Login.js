import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "./Login.css";
import LoginForm from "./LoginForm";
function Login() {
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
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Login;
