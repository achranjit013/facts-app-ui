import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Form, FormLabel, FormSelect } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { signupUser } from "../helper/axiosHelper";

// css
const SignupFormContainer = styled(Form)`
  background: #44403c;
  margin-bottom: 40px;
  padding: 16px 32px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30vw;

  height: 70vh;

  overflow: scroll;
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

const InputLabel = styled(FormLabel)`
  padding: 16px;
  font-size: 18px;
  color: inherit;
  font-family: inherit;
`;

const SelectField = styled(FormSelect)`
  width: 22vw;
  background: #78716c;
  border: none;
  border-radius: 100px;
  padding: 16px;
  font-size: 18px;
  color: inherit;
  font-family: inherit;

  &::placeholder {
    color: #a8a29e;
  }
`;
// end css

// custom inputs
const primaryInputs = [
  {
    label: "Full name",
    type: "text",
    name: "fname",
    required: true,
    placeholder: "first name",
  },
  {
    label: "",
    type: "text",
    name: "mname",
    required: false,
    placeholder: "middle name",
  },
  {
    label: "",
    type: "text",
    name: "lname",
    required: true,
    placeholder: "last name",
  },
  {
    label: "Address",
    type: "text",
    name: "street",
    required: true,
    placeholder: "street number & name",
  },
  {
    label: "",
    type: "text",
    name: "suburb",
    required: true,
    placeholder: "suburb",
  },
  {
    label: "",
    type: "number",
    name: "postcode",
    required: true,
    placeholder: "postcode",
  },
];

const secondaryInputs = [
  {
    label: "Email",
    type: "email",
    name: "email",
    required: true,
    placeholder: "email address",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    required: true,
    placeholder: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    required: true,
    placeholder: "confirm password",
  },
];

export const SignupForm = ({ setResponse }) => {
  const initialFormState = {
    fname: "",
    mname: "",
    lname: "",
    street: "",
    suburb: "",
    states: "",
    postcode: null,
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [form, setForm] = useState(initialFormState);

  const handleOnChange = (e) => {
    setResponse({});

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    if (confirmPassword !== rest.password) {
      return alert("Password do not match. Please check and try again!");
    }

    // store user info : call axios helper to make post api call
    const data = await signupUser(rest);
    setResponse(data);

    data.status === "success" && setForm(initialFormState);
  };

  return (
    <>
      <SignupFormContainer onSubmit={handleOnSubmit}>
        {primaryInputs.map((item, i) => (
          <CustomInput
            key={i}
            {...item}
            onChange={handleOnChange}
            value={form[item.name] || ""}
          />
        ))}

        <Form.Group style={{ marginBottom: "1rem" }}>
          <InputLabel>State</InputLabel>
          <br />
          <SelectField
            name="states"
            required
            onChange={handleOnChange}
            value={form["states"] || ""}
          >
            <option value="" className="text-light">
              - Select -
            </option>
            <option value="NSW">NSW</option>
            <option value="QLD">QLD</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="VIC">VIC</option>
            <option value="WA">WA</option>
          </SelectField>
        </Form.Group>

        {secondaryInputs.map((item, i) => (
          <CustomInput
            key={i}
            {...item}
            onChange={handleOnChange}
            value={form[item.name] || ""}
          />
        ))}

        <LoginBtn type="submit">Signup</LoginBtn>
      </SignupFormContainer>
      <SignupArea>
        <p>Already a member?</p>
        <SignupLink to="/login">Login</SignupLink>
      </SignupArea>
    </>
  );
};
