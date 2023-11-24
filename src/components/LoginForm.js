import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../helper/axiosHelper";

// custom inputs
const inputs = [
  {
    label: "Email",
    type: "email",
    name: "email",
    required: true,
    placeholder: "Enter your email address",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    required: true,
    placeholder: "Enter your password",
  },
];

// css
const LoginFormContainer = styled(Form)`
  background: #44403c;
  margin-bottom: 40px;
  padding: 16px 32px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30vw;
`;

const LoginBtn = styled.button`
  cursor: pointer;
  width: 22vw;
  background: #78716c;
  border: none;
  border-radius: 100px;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  color: inherit;
  font-family: inherit;

  &::placeholder {
    color: #a8a29e;
  }
`;

const SignupArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SignupLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  color: inherit;
  font-family: "Coiny", sans-serif;
  line-height: 1;
  font-size: 20px;
  padding: 20px 32px 17px;
  background: #78716c;
`;
// end css

export const LoginForm = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // call axios helper to make post api call for login
    const data = await loginUser(form);
    console.log(data);

    if (data?.status === "success") {
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // navigate to user dashboard
      navigate("/userDashboard");
    }
  };

  return (
    <>
      <LoginFormContainer onSubmit={handleOnSubmit}>
        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <LoginBtn type="submit">Login</LoginBtn>
      </LoginFormContainer>
      <SignupArea>
        <p>Are you new here?</p>
        <SignupLink to="/signup">Sign Up</SignupLink>
      </SignupArea>
    </>
  );
};
