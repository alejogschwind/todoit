import React from 'react';
import styled from 'styled-components';

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

  cursor: pointer;
`;

const Button = ({ children, ...othersProps }) => (
  <ButtonWrapper {...othersProps}>
    {children}
  </ButtonWrapper>
);

export default Button;