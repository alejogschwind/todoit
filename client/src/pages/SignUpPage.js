import React, { useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Input from "../components/Input";
import Button from "../components/Button";
import { ReactComponent as SendIcon } from "../assets/send.svg";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const REGISTER_USER = gql`
  mutation registerUser($user: RegisterUserInput!) {
    registerUser(user: $user) {
      _id
    }
  }
`;

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

const ErrorMessage = styled.div`
  color: #f3212d;
  display: block;
  font-size: 12px;
  font-weight: 200px;
`;

const SignUpPage = (props) => {
  const { register, handleSubmit, errors, watch } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  const [registerUser, { loading, data, error }] = useMutation(REGISTER_USER);

  const onSubmit = async (inputs) => {
    try {
      await registerUser({
        variables: {
          user: {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
            password: inputs.password,
            confirmPassword: inputs.confirmPassword,
          },
        },
      });
      props.history.push("/verify-email");
    } catch (err) {
      console.log(err);
      // throw err;
    }
  };

  return (
    <SignUpWrapper>
      <H2>Registrate para continuar</H2>
      {error && <ErrorMessage>Algo salio mal :(</ErrorMessage>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsWrapper>
          <Input
            type="text"
            name="firstName"
            placeholder="Ingrese su nombre..."
            ref={register({ required: "Debes ingresar su nombre." })}
            errors={errors.firstName}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Ingrese su apellido..."
            ref={register({ required: "Debes ingresar su apellido." })}
            errors={errors.lastName}
          />
          <Input
            type="text"
            name="email"
            placeholder="Ingrese su email..."
            ref={register({ required: "Debes ingresar su email." })}
            errors={errors.email}
          />
          <Input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña..."
            ref={register({
              required: "Debes ingresar una contraseña.",
              minLength: {
                value: 8,
                message: "La contraseña debe tener almenos 8 caracteres.",
              },
            })}
            errors={errors.password}
          />
        </InputsWrapper>
        <ButtonPositioned>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme su contraseña..."
            ref={register({
              required: "Debes confirmar su contraseña.",
              validate: (value) =>
                value === password.current || "La contraseña no coincide.",
            })}
            errors={errors.confirmPassword}
          />
          <Button type="submit">
            <SendIcon />
          </Button>
        </ButtonPositioned>
      </form>
      <H6>
        Ya tienes una cuenta? <StyledLink to="/login">Ingresa</StyledLink>
      </H6>
    </SignUpWrapper>
  );
};

export default withRouter(SignUpPage);
