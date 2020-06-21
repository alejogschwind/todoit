import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/AuthContext";

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;
const HomePage = (props) => {
  const { setAuth } = useContext(AuthContext);
  const [logoutUser, { loading, data, error }] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="HomePage">
      Home!!
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default withRouter(HomePage);
