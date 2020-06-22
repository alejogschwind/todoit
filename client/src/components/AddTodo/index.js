import React, { useState } from "react";
import { useSpring, animated } from "react-spring";


import Input from "../Input";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { GET_TODOS } from "../Todos";

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
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [newTodo, setNewTodo] = useState("");

  const style = useSpring({
    from: { opacity: 0, transform: "scale(0)" },
    to: [{ opacity: 1, transform: "scale(1)" }],
    config: {
      duration: 400,
    },
  });

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
    <animated.div style={style}>
      <Input
        placeholder="Añade una nueva tarea..."
        name="todo"
        onKeyDown={handelKeyDown}
        value={newTodo}
        onChange={handelChange}
      />
    </animated.div>
  );
};

export default AddTodo;
