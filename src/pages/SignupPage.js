import React, { useState } from "react";
import { SignupForm } from "../components/SignupForm";
import { styled } from "styled-components";
import { Alert, Container } from "react-bootstrap";

// css
const ContainerFluid = styled(Container)`
  position: relative;
`;

const MainLeft = styled.div`
  position: absolute;
  top: 7rem;
  left: 8rem;
  color: darkturquoise;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 90vh;
`;

const SignupIntro = styled.div`
  border-radius: 10px;
  padding: 1rem;
  box-shadow: -5px -5px 30px 0px #3e3b3a;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
// end css

export const SignupPage = () => {
  const [response, setResponse] = useState({});

  return (
    <ContainerFluid fluid>
      <MainLeft>
        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
      </MainLeft>
      <Main>
        <SignupIntro>
          <h1>Join our community!</h1>
          <p>
            Sign up to our system and engage with the community with interesting
            facts.
          </p>
        </SignupIntro>

        <SignupIntro>
          <h3>Signup!</h3>
          <SignupForm setResponse={setResponse} />
        </SignupIntro>
      </Main>
    </ContainerFluid>
  );
};
