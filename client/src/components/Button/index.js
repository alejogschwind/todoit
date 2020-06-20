import React from 'react';
import styled from 'styled-components';
import Loading from '../Loading';

const ButtonWrapper = styled.button`
  height: 60px;
  min-width: 60px;
  background: #2196F3;
  border: none;
  border-radius: 5px;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
  }
  
  cursor: pointer;
`;

const Button = ({ children, loanding, ...othersProps }) => (
  <ButtonWrapper {...othersProps} disabled={loanding}>
    {loanding ?  <Loading /> : children}
  </ButtonWrapper>
);

export default Button;