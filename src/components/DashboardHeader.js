import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import LogoImg from "../assets/logo.png";
import { Button } from "react-bootstrap";

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
  font-size: 32px;
  text-transform: uppercase;
  line-height: 1;
  margin-top: 6px;
`;

const LogoTextMain = styled.h1`
  font-family: "Coiny", sans-serif;
  font-size: 42px;
  text-transform: uppercase;
  line-height: 1;
  margin-top: 6px;
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
  font-size: 15px;
  padding: 20px 32px 17px;
  background-image: linear-gradient(135deg, #3b82f6, #16a34a, #ef4444, #eab308);
  transition: 0.3s;

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const DashboardHeader = ({ setResponse, getFacts, showModal }) => {
  const userJson = sessionStorage.getItem("user");
  const userObj = JSON.parse(userJson);

  const handleOnLogout = () => {
    sessionStorage.removeItem("user");
    setResponse("");
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
