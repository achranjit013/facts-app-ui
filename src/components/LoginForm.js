import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../helper/axiosHelper";
import { toast } from "react-toastify";

// css
const LoginFormContainer = styled(Form)`
  background: #44403c;
  margin-bottom: 40px;
  padding: 24px 32px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30vw;

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const LoginBtn = styled.button`
  cursor: pointer;
  width: 354px;
  background: #78716c;
  border: none;
  border-radius: 100px;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  color: inherit;
  font-family: inherit;

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const SignupArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

    if (data?.status === "success") {
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // navigate to user-dashboard
      navigate("/user-dashboard");
    } else {
      toast[data.status](data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

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
