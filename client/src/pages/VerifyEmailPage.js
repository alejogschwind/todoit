import React, { useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import styled from "styled-components";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loading from "../components/Loading";

const VerifyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.div`
  font-weight: 200;
  font-size: 32px;
`;

const VERIFY_EMAIL = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

const VerifyEmailPage = (props) => {
  const [verifyEmail, { data, error, loading }] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    const mutate = async () => {
      if (props.match.params.token) {
        try {
          await verifyEmail({
            variables: { token: props.match.params.token },
          });
        } catch (err) {
          // Internal Error
        }
      }
    };
    mutate();
  }, []);

  if (loading) return <Loading />;
  return (
    <VerifyWrapper>
      {data && data.verifyEmail ? (
        <Redirect to="/login" />
      ) : (
        <H1>El link caduco, o el token provisto es invalido.</H1>
      )}
    </VerifyWrapper>
  );
};

export default withRouter(VerifyEmailPage);
