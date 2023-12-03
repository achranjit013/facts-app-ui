import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import LogoImg from "../assets/interesting-facts.png";
import { Button } from "react-bootstrap";

const HeaderComponent = styled.div`
  margin-bottom: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: normal;
    flex-direction: column;
    gap: 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 0;
  }
`;

const LogoImage = styled.img`
  border-radius: 100%;
  height: 68px;
  width: 68px;

  @media (max-width: 768px) {
    height: 38px;
    width: 38px;
  }
`;

const LogoText = styled.h1`
  font-family: "Coiny", sans-serif;
  font-size: 32px;
  text-transform: uppercase;
  line-height: 1;
  margin-top: 6px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const LogoTextMain = styled.h1`
  font-family: "Coiny", sans-serif;
  font-size: 42px;
  text-transform: uppercase;
  line-height: 1;
  margin-top: 6px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const BtnLink = styled(Button)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  color: inherit;
  font-family: "Coiny", sans-serif;
  line-height: 1;
  font-size: 15px;
  padding: 20px 32px 17px;
  background-image: linear-gradient(135deg, #3b82f6, #16a34a, #ef4444, #eab308);
  transition: 0.3s;

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }

  @media (max-width: 768px) {
    padding: 12px 18px 12px;
  }
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  color: inherit;
  font-family: "Coiny", sans-serif;
  line-height: 1;
  font-size: 16px;
  padding: 20px 32px 17px;
  background-image: linear-gradient(135deg, #3b82f6, #16a34a, #ef4444, #eab308);
  transition: 0.3s;

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }

  @media (max-width: 768px) {
    padding: 12px 18px 12px;
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 0;
  }
`;

export const DashboardHeader = ({ getFacts, showModal }) => {
  const userJson = sessionStorage.getItem("user");
  const userObj = JSON.parse(userJson);

  const handleOnLogout = () => {
    sessionStorage.removeItem("user");
    getFacts();
  };

  return (
    <HeaderComponent>
      <Logo>
        {userObj?._id ? (
          <LogoText>
            Hello {userObj.fname.substring(0, 1)}.{" "}
            {userObj.mname !== "" ? userObj.mname.substring(0, 1) + "." : ""}{" "}
            {userObj.lname}, welcome to your facts portal!
          </LogoText>
        ) : (
          <>
            <LogoImage src={LogoImg} alt="logo" />
            <LogoTextMain>Today I Learned!</LogoTextMain>
          </>
        )}
      </Logo>
      {userObj?._id ? (
        <HeaderLinks>
          <div>
            <BtnLink onClick={showModal}>Post a fact</BtnLink>
          </div>

          <LoginLink to="/" onClick={handleOnLogout}>
            Log out
          </LoginLink>
        </HeaderLinks>
      ) : (
        <LoginLink to="/login">
          Want to post a fact ? <br /> Please login!
        </LoginLink>
      )}
    </HeaderComponent>
  );
};
