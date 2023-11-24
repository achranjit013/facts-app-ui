import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import LogoImg from "../assets/logo.png";

const HeaderComponent = styled.div`
  margin-bottom: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const LogoImage = styled.img`
  height: 68px;
  width: 68px;
`;

const LogoText = styled.h1`
  font-family: "Coiny", sans-serif;
  font-size: 42px;
  text-transform: uppercase;
  line-height: 1;
  margin-top: 6px;
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
  // font-size: 20px;
  font-size: 15px;
  padding: 20px 32px 17px;
  background-image: linear-gradient(135deg, #3b82f6, #16a34a, #ef4444, #eab308);
  transition: 0.3s;

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }
`;

export const DashboardHeader = () => {
  return (
    <HeaderComponent>
      <Logo>
        <LogoImage src={LogoImg} alt="logo" />
        <LogoText>Today I Learned!</LogoText>
      </Logo>
      <LoginLink to="/login">
        Want to post a fact ? <br /> Please login!
      </LoginLink>
    </HeaderComponent>
  );
};
