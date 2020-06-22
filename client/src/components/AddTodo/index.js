import React, { useState } from "react";

import Input from "../Input";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { GET_TODOS } from '../Todos'

const CREATE_TODO = gql`
  mutation createTodo($text: String!) {
    createTodo(text: $text) {
      _id
      text
      done
    }
  }
`;

const AddTodo = () => {
  const [addTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{query: GET_TODOS}],
  });
  const [newTodo, setNewTodo] = useState("");

  const handelKeyDown = async (e) => {
    if (e.key === "Enter" && !(newTodo === "")) {
      await addTodo({
        variables: {
          text: newTodo,
        },
      });
      setNewTodo("");
    }
  };

  const handelChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <Input
      placeholder="Añade una nueva tarea..."
      name="todo"
      onKeyDown={handelKeyDown}
      value={newTodo}
      onChange={handelChange}
    />
  );
};

export default AddTodo;
