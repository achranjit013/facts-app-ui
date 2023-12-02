import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { styled } from "styled-components";

const InputField = styled(FormControl)`
  // width: 22vw;
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
`;

export const CustomInput = ({ ...rest }) => {
  return (
    <Form.Group>
      <InputField {...rest} />
    </Form.Group>
  );
};
