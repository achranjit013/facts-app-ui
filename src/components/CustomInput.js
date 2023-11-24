import React from "react";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { styled } from "styled-components";

const InputLabel = styled(FormLabel)`
  padding: 16px;
  font-size: 18px;
  color: inherit;
  font-family: inherit;
`;

const InputField = styled(FormControl)`
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

export const CustomInput = ({ label, ...rest }) => {
  return (
    <Form.Group style={{ marginBottom: "1rem" }}>
      <InputLabel>{label}</InputLabel>
      <br />
      <InputField {...rest} />
    </Form.Group>
  );
};
