import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Input from "../components/Input";
import Button from "../components/Button";
import { ReactComponent as SendIcon } from "../assets/send.svg";

const LoginWrapper = styled.section`
  width: 60vw;
  position: relative;
`;

const InputsWrapper = styled.div`
  width: calc(100% - 90px);
`;

const ButtonPositioned = styled.div`
  display: flex;
  margin: -15px 0;
`;

const H2 = styled.h2`
  font-weight: 200;
  font-size: 32px;
  color: #323232;
`;

const H6 = styled.h2`
  font-weight: 200;
  font-size: 18px;
  color: #323232;
  margin: 10px 0;
`;

const StyledLink = styled(Link)`
  color: #2196f3;
`;

const LoginPage = () => (
  <LoginWrapper>
    <H2>Ingresa para continuar</H2>
    <InputsWrapper>
      <Input type="text" placeholder="Ingrese su email..." />
    </InputsWrapper>
    <ButtonPositioned>
      <Input type="password" placeholder="Ingrese su contraseña..." />
      <Button>
        <SendIcon />
      </Button>
    </ButtonPositioned>
    <H6>
      No tienes una cuenta? <StyledLink to="/signup">Registrate</StyledLink>
    </H6>
  </LoginWrapper>
);

export default LoginPage;
