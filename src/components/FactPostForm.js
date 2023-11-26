import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CustomInput } from "./CustomInput";

const inputs = [
  {
    label: "Date",
    type: "date",
    name: "date",
    required: true,
  },
  {
    label: "Title",
    type: "text",
    name: "title",
    required: true,
  },
  {
    label: "Amount",
    type: "number",
    name: "amount",
    required: true,
  },
];

export const FactPostForm = ({ onHide }) => {
  return (
    <>
      <Form className="shadow-lg border rounded p-3 bg-secondary">
        <Row>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type">
                <option value="">- Select -</option>
                <option value="income">Income</option>
                <option value="expenses">Expenses</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {inputs.map((item, i) => (
            <Col md={3} key={i}>
              <CustomInput {...item} />
            </Col>
          ))}
          <Col md={1}>
            <Form.Group className="">
              <div className="d-grid mt-4">
                <Button type="submit" onClick={onHide}>
                  Add
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};
