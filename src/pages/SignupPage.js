import React from "react";
import { SignupForm } from "../components/SignupForm";
import { styled } from "styled-components";

// css
const Main = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 90vh;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const SignupIntro = styled.div`
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

export const SignupPage = () => {
  return (
    <Main>
      <SignupIntro>
        <HeadingH1>Join our community!</HeadingH1>
        <p style={{ textAlign: "center" }}>
          Sign up to our system and engage with the world by sharing interesting
          facts.
        </p>
      </SignupIntro>
      <SignupIntro>
        <HeadingH3>Signup!</HeadingH3>
        <SignupForm />
      </SignupIntro>
    </Main>
  );
};
