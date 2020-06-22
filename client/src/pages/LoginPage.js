import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";

import Input from "../components/Input";
import Button from "../components/Button";
import { ReactComponent as SendIcon } from "../assets/send.svg";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/AuthContext";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      firstName
      lastName
      email
    }
  }
`;

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

const LoginPage = (props) => {
  const { setAuth } = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const style = useSpring({
    to: { opacity: 1, transform: "translate3d(0px,0,0)" },
    from: { opacity: 0, transform: "translate3d(-100px,0,0)" },
    config: {
      duration: 500,
    },
  });

  const onSubmit = async (input) => {
    try {
      const { data } = await loginUser({
        variables: {
          email: input.email,
          password: input.password,
        },
      });
      setAuth({ ...data.loginUser });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginWrapper>
      <animated.div style={style}>
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
            <Button loading={{ loading }}>
              <SendIcon />
            </Button>
          </ButtonPositioned>
        </form>
        <H6>
          No tienes una cuenta? <StyledLink to="/signup">Registrate</StyledLink>
        </H6>
      </animated.div>
    </LoginWrapper>
  );
};

export default withRouter(LoginPage);
