import React from "react";
import styled from "styled-components";

import { ReactComponent as IconClose } from "../../assets/close.svg";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { GET_TODOS } from "../Todos";

const ButtonDelete = styled.button`
  margin: 10px 5px;
  height: auto;
  background: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    & path {
      fill: #323232;
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`;

const DeleteTodo = ({ id }) => {
  const [deleteTodo, { loading }] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleDelete = async () => {
    await deleteTodo({
      variables: {
        id,
      },
    });
  };

  return (
    <ButtonDelete disabled={loading} onClick={handleDelete}>
      <IconClose />
    </ButtonDelete>
  );
};

export default DeleteTodo;
