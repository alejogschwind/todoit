import React from 'react';
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from './pages/VerifyEmailPage';
import AfterRegister from './pages/AfterRegister';

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
    <Route exact path="/verify-email">
      <AfterRegister />
    </Route>
    <Route path="/verify-email/:token">
      <VerifyEmailPage />
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
