import React from "react";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AutenticatedRoute from "./AuthenticatedRoute";
import AuthenticatedGuard from "./AuthenticatedGuard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signin" component={Login} />
          <AuthenticatedGuard>
          <AutenticatedRoute />
          </AuthenticatedGuard>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
