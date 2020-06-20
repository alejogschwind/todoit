import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router";

import { AuthContext } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AfterRegister from "./pages/AfterRegister";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Switch>
      <PrivateRoute exact path="/">
        <HomePage />
      </PrivateRoute>
      <Route exact path="/login">
        {auth ? <Redirect to="/" /> : <LoginPage />}
      </Route>
      <Route exact path="/signin">
        {auth ? <Redirect to="/" /> : <LoginPage />}
      </Route>
      <Route exact path="/signup">
        {auth ? <Redirect to="/" /> : <SignUpPage />}
      </Route>
      <Route exact path="/verify-email">
        {auth ? <Redirect to="/" /> : <AfterRegister />}
      </Route>
      <Route path="/verify-email/:token">
        {auth ? <Redirect to="/" /> : <VerifyEmailPage />}
      </Route>
      <Route>
        {/* <NoMatch /> */}
        Not Found
      </Route>
    </Switch>
  );
};

export default Routes;
