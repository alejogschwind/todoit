import React, { useContext } from "react";
import styled from "styled-components";
import { withRouter, Redirect } from "react-router-dom";

import Navbar from "../components/Navbar";
import Checkbox from "../components/Checkbox";
import Todo from "../components/Todo";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/AuthContext";

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

const HomeWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const MAIN = styled.div`
  height: calc(100vh - 100px);
  width: 100%;
  display: flex;
`;

const LeftSection = styled.div`
  width: 20%;
  height: 100%;
  /* background: red; */
`;

const RightSection = styled.div`
  width: 20%;
  height: 100%;
  /* background: blue; */
`;

const CenterSection = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
    <HomeWrapper>
      <Navbar />
      <MAIN>
        <LeftSection></LeftSection>
        <CenterSection>
          {/* <Checkbox /> */}
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
        </CenterSection>
        <RightSection></RightSection>
      </MAIN>
      {/* <button onClick={() => handleLogout()}>Logout</button> */}
    </HomeWrapper>
  );
};

export default withRouter(HomePage);
