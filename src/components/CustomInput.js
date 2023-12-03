import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { styled } from "styled-components";

const InputField = styled(FormControl)`
  width: 354px;
  background: #78716c;
  border: none;
  border-radius: 100px;
  padding: 16px;
  font-size: 18px;
  color: inherit;
  font-family: inherit;
  margin-bottom: 1rem;

  &::placeholder {
    color: #a8a29e;
  }

  @media (max-width: 768px) {
    width: 300px;
  }
`;

export const CustomInput = ({ label, ...rest }) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <InputField {...rest} />
    </Form.Group>
  );
};
