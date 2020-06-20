import React from 'react';
import styled from 'styled-components';

import { ReactComponent as IconEmail } from "../assets/email.svg";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.div`
  font-weight: 200;
  font-size: 32px;
`;

const AfterRegister = () => (
  <MessageWrapper>
    <IconEmail />
    <H1>Revisa tu correo para confirmar tu email.</H1>
  </MessageWrapper>
);

export default AfterRegister;