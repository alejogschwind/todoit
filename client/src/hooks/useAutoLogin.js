import React from 'react';
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

function useAutoLogin() {
  const { data, loading } = useQuery(AUTO_LOGIN);

  if (loading) return null
  // if (data === false) return false
  return {
    ...data
  }
};

export default useAutoLogin;
