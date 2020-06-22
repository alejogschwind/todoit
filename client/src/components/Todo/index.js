import React, { useState } from "react";

import styled from "styled-components";
import { animated, useSpring } from "react-spring";

import CheckTodo from "../CheckTodo";
import DeleteTodo from "../DeleteTodo";

const TodoWrapper = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RigthWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50vw;
  margin: 10px 0;
`;

const TodoText = styled.span`
  font-weight: 200;
  font-size: 18px;
  color: #323232;
  margin: 0 1em;
  user-select: none;
  text-decoration: ${(props) =>
    props.checked ? "line-through solid #2196F3" : "none"};
`;

const Todo = ({ text, id, done }) => {
  const [check, setCheck] = useState(done)

  return (
    <TodoWrapper>
      <RigthWrapper>
        <CheckTodo check={check} id={id} setCheck={setCheck} />
        <TodoText checked={check}>{text}</TodoText>
      </RigthWrapper>
      <DeleteTodo id={id} />
    </TodoWrapper>
  );
};

export default Todo;
