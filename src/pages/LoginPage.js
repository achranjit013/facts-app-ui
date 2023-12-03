import React from "react";
import { LoginForm } from "../components/LoginForm";
import { styled } from "styled-components";

// css
const Main = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 90vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LoginIntro = styled.div`
  border-radius: 16px;
  padding: 16px;
  box-shadow: -5px -5px 30px 0px #3e3b3a;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    min-width: 90vw;
  }
`;

const HeadingH1 = styled.h1`
  font-size: 42px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const HeadingH3 = styled.h3`
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
// end css

export const LoginPage = () => {
  return (
    <Main>
      <LoginIntro>
        <HeadingH1>Welcome Back!</HeadingH1>
        <p style={{ textAlign: "center" }}>
          Login to our system and post interseting facts.
        </p>
      </LoginIntro>
      <LoginIntro>
        <HeadingH3>Login!</HeadingH3>
        <LoginForm />
      </LoginIntro>
    </Main>
  );
};
