import React from "react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import Checkbox from "../Checkbox";

import { GET_TODOS } from '../Todos'

const CHECK_TODO = gql`
  mutation checkTodo($id: String!, $done: Boolean!) {
    checkTodo(id: $id, done: $done) {
      done
    }
  }
`;

const CheckTodo = ({ id, check, setCheck }) => {
  const [checkTodo] = useMutation(CHECK_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleUpdate = async () => {
    setCheck(!check);
    await checkTodo({
      variables: {
        id: id,
        done: !check,
      }
    });
  };

  return <Checkbox check={check} handleUpdate={handleUpdate} />;
};

export default CheckTodo;
