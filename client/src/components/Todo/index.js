import React, { useState } from "react";
import styled from "styled-components";

import Checkbox from "../Checkbox";

const TodoWrapper = styled.div`
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

const Todo = () => {
  const [check, setCheck] = useState(false);

  return (
    <TodoWrapper>
      <Checkbox check={check} setCheck={setCheck} />
      <TodoText checked={check}>
        Hacer las compras
      </TodoText>
    </TodoWrapper>
  );
};

export default Todo;
