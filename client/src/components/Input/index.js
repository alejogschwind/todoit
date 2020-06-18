import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  height: 60px;
  margin: 15px 0;
`

const StyledInput = styled.input`
  height: 100%;
  width: 100%;
  border: 1px solid #CDCDCD;
  border-radius: 5px;
  padding: 0 1em;

  font-size: 24px;
  color: #323232;
  font-weight: 200;
  &:focus {
    outline: none;
    border: 1px solid #2196F3;
    border-radius: 5px;
  }
  &::placeholder {
    color: #CECECE;
  }
`;

const Input = (props) => {
  return (
    <InputWrapper>
      <StyledInput {...props}/>
    </InputWrapper>
  );
}

export default Input;