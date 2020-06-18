import React from 'react';
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

export const routes = (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Route exact path="/login">
      <LoginPage />
    </Route>
    <Route exact path="/signup">
      <SignUpPage />
    </Route>
    <Route path="/:user">
      {/* <User /> */}
      User
    </Route>
    <Route>
      {/* <NoMatch /> */}
      Not Found
    </Route>
  </Switch>
);
