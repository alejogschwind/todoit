import React, { useState, useMemo, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import Loading from "../components/Loading";
import Routes from "../routes";

import useAutoLogin from "../hooks/useAutoLogin";

import { AuthContext } from "../context/AuthContext";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const AUTO_LOGIN = gql`
  query userIsLogin {
    userIsLogin {
      _id
      firstName
      lastName
      email
    }
  }
`;

const AppWrapper = styled.div`
  /* height: 100vh; */
  width: 100vw;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;

const checkLogin = (data) => {};

function App() {
  const [auth, setAuth] = useState(null);

  const authValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  const { data, error } = useQuery(AUTO_LOGIN);

  useEffect(() => {
    if (data) {
      if (data.userIsLogin) {
        setAuth({ ...data.userIsLogin });
      } else {
        setAuth(false);
      }
    }
  }, [data]);

  return (
    <AppWrapper>
      {auth === null ? (
        <Loading />
      ) : (
        <AuthContext.Provider value={authValue}>
          <Routes />
        </AuthContext.Provider>
      )}
    </AppWrapper>
  );
}

export default App;
