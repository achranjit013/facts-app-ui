import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Col, Container, Row } from "react-bootstrap";
import { styled } from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 90vh;
`;

const LoginIntro = styled.div`
  border-radius: 10px;
  padding: 1rem;
  box-shadow: -5px -5px 30px 0px #3e3b3a;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const LoginPage = () => {
  return (
    <Container fluid>
      <Main>
        <LoginIntro>
          <h1>Welcome Back!</h1>
          <p>Login to our system and post interseting facts.</p>
        </LoginIntro>
        <LoginIntro>
          <h3>Login!</h3>
          <LoginForm />
        </LoginIntro>
      </Main>
    </Container>
  );
};
