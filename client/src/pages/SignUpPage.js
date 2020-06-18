import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Input from "../components/Input";
import Button from "../components/Button";
import { ReactComponent as SendIcon } from "../assets/send.svg";

const SignUpWrapper = styled.section`
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

const SignUpPage = () => (
  <SignUpWrapper>
    <H2>Registrate para continuar</H2>
    <InputsWrapper>
      <Input type="text" placeholder="Ingrese su nombre..." />
      <Input type="text" placeholder="Ingrese su apellido..." />
      <Input type="text" placeholder="Ingrese su email..." />
      <Input type="password" placeholder="Ingrese su contraseña..." />
    </InputsWrapper>
    <ButtonPositioned>
      <Input type="password" placeholder="Confirme su contraseña..." />
      <Button>
        <SendIcon />
      </Button>
    </ButtonPositioned>
    <H6>
      Ya tienes una cuenta? <StyledLink to="/login">Ingresa</StyledLink>
    </H6>
  </SignUpWrapper>
);

export default SignUpPage;
