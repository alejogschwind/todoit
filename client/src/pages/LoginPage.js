import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from 'react-hook-form';

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

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm({});
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <LoginWrapper>
      <H2>Ingresa para continuar</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsWrapper>
          <Input
            type="text"
            name="email"
            placeholder="Ingrese su email..."
            ref={register({ required: "Debes ingresar su email." })}
            errors={errors.email}
          />
        </InputsWrapper>
        <ButtonPositioned>
          <Input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña..."
            ref={register({
              required: "Debes ingresar su contraseña.",
            })}
            errors={errors.password}
          />
          <Button>
            <SendIcon />
          </Button>
        </ButtonPositioned>
      </form>
      <H6>
        No tienes una cuenta? <StyledLink to="/signup">Registrate</StyledLink>
      </H6>
    </LoginWrapper>
  );
};

export default LoginPage;
