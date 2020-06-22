import React, { useContext, useEffect } from "react";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import Loading from "../Loading";
import Todo from "../Todo";

import { TodoContext } from "../../context/TodoContext";

const GET_TODOS = gql`
  {
    todos {
      _id
      text
      done
    }
  }
`;

const Todos = () => {
  const { data, loading, error} = useQuery(GET_TODOS);
  const { todos, setTodos } = useContext(TodoContext);


  useEffect(() => {
    if (data)
      setTodos(data.todos)
  }, [data])

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo._id} id={todo._id} text={todo.text} done={todo.done} />
      ))}
    </div>
  );
};

export default Todos;
