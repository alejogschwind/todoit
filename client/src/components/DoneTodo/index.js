import React, { useContext } from "react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import Checkbox from "../Checkbox";

import { TodoContext } from "../../context/TodoContext";

const CHECK_TODO = gql`
  mutation checkTodo($id: String!, $done: Boolean!) {
    checkTodo(id: $id, done: $done) {
      _id
      text
      done
    }
  }
`;

const DoneTodo = ({ check, id, setCheck }) => {
  const [checkTodo] = useMutation(CHECK_TODO, {
    refetchQueries: [{ query: "todos" }],
  });
  // const { todos, setTodos} = useContext(TodoContext);

  const handleUpdate = async () => {
    console.log(check);
    const { data } = await checkTodo({
      variables: {
        id: id,
        done: !check,
      },
    });

    setCheck(data.checkTodo.done);
    // setTodos([...todos])
  };

  return <Checkbox check={check} handleUpdate={handleUpdate} />;
};

export default DoneTodo;
