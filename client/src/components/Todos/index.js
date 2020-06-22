import React, { useState, useEffect, useRef } from "react";

import {useTransition, useChain, animated} from 'react-spring'

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import Loading from "../Loading";
import Todo from "../Todo";

export const GET_TODOS = gql`
  {
    todos {
      _id
      text
      done
    }
  }
`;

const Todos = () => {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [todos, setTodos] = useState([]);

  const transitionRef = useRef()
  const transitions = useTransition(todos, (item) => item._id, {
    from: { opacity: 0,transform: "translate3d(-40px,0,0)" },
    enter: { opacity: 1,transform: "translate3d(0,0,0)" },
    leave: {  opacity: 0,transform: "translate3d(40px,0,0)" },
    ref: transitionRef,
    trail: 1000 / todos.length,
    unique: true
  });

  useChain([transitionRef], [0.5])


  useEffect(() => {
    if (data) {
      setTodos(data.todos.reverse());
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Todo id={item._id} text={item.text} done={item.done} />
        </animated.div>
      ))}
    </>
  );
};

export default Todos;
