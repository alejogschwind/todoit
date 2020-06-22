import React, { useState, useContext } from "react";

import Input from "../Input";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

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
  const [addTodo, { data, error, loading }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: "todos" }],
  });
  const [newTodo, setNewTodo] = useState("");

  const handelKeyDown = async (e) => {
    console.log('key')
    if (e.key === "Enter") {
      console.log('key')
      const { data } = await addTodo({
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
