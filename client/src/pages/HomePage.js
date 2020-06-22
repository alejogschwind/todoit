import React, { useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Navbar from "../components/Navbar";
import Todos from "../components/Todos";

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
  width: 25vw;
  height: 100%;
  /* background: red; */
`;

const RightSection = styled.div`
  width: 25vw;
  height: 100%;
  /* background: blue; */
`;

const CenterSection = styled.ul`
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const HomePage = (props) => {
  const { setAuth } = useContext(AuthContext);
  const [logoutUser] = useMutation(LOGOUT_USER);

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
          <Todos />
        </CenterSection>
        <RightSection></RightSection>
      </MAIN>
      {/* <button onClick={() => handleLogout()}>Logout</button> */}
    </HomeWrapper>
  );
};

export default withRouter(HomePage);
