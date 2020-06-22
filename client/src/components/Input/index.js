import React, { forwardRef } from "react";

import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const InputWrapper = styled.div`
  width: 100%;
  margin: 15px 0;
`;

const StyledInput = styled.input`
  height: 60px;
  width: 100%;
  border: ${(props) =>
    props.errors ? "1px solid #F3212D" : "1px solid #CDCDCD"};
  border-radius: 5px;
  padding: 0 1em;

  font-size: 24px;
  color: #323232;
  font-weight: 200;
  &:focus {
    outline: none;
    border: ${(props) =>
      props.errors ? "1px solid #F3212D" : "1px solid #2196F3"};
    border-radius: 5px;
  }
  &::placeholder {
    color: #cecece;
  }
`;

const ErrorMessage = styled.div`
  color: #f3212d;
  display: block;
  font-size: 12px;
  font-weight: 200px;
`;

const Input = forwardRef((props, ref) => {
  const style = useSpring({
    from: { opacity: 0, transform: "scale(0)" },
    to: [
      { opacity: 1, transform: "scale(1)" },
    ],
    config: {
      duration: 400,
    },
  });

  return (
    <animated.div style={style}>
      <InputWrapper>
        <StyledInput {...props} ref={ref} />
        <ErrorMessage>{props.errors && props.errors.message}</ErrorMessage>
      </InputWrapper>
    </animated.div>
  );
});

export default Input;
