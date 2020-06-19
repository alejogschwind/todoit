import React, { forwardRef } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  margin: 15px 0;
`

const StyledInput = styled.input`
  height: 60px;
  width: 100%;
  border: ${props => props.errors ? '1px solid #F3212D' : '1px solid #CDCDCD'};
  border-radius: 5px;
  padding: 0 1em;

  font-size: 24px;
  color: #323232;
  font-weight: 200;
  &:focus {
    outline: none;
    border: ${props => props.errors ? '1px solid #F3212D' : '1px solid #2196F3'};
    border-radius: 5px;
  }
  &::placeholder {
    color: #CECECE;
  }
`;

const ErrorMessage = styled.div`
  color: #F3212D;
  display: block;
  font-size: 12px;
  font-weight: 200px;
`;

const Input = forwardRef((props, ref) => {
  return (
    <InputWrapper>
      <StyledInput {...props} ref={ref}/>
      <ErrorMessage>{props.errors && props.errors.message}</ErrorMessage>
    </InputWrapper>
  );
  }
)
  

export default Input;