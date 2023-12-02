import React, { useState } from "react";
import { Button, Col, Form, FormSelect, Row } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { styled } from "styled-components";
import { addNewFact, updateFactById } from "../helper/axiosHelper";

// const inputs = [
//   {
//     type: "text",
//     name: "fact",
//     maxLength: "200",
//     placeholder: "share a fact...",
//     required: true,
//   },
//   {
//     type: "text",
//     name: "source",
//     placeholder: "trustworthy source...",
//     required: true,
//   },
// ];

const ModForm = styled(Form)`
  background: #292524;
`;

const IpFormSelect = styled(FormSelect)`
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

const BtnSubmit = styled(Button)`
  width: 354px;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-family: "Coiny", sans-serif;
  font-size: 18px;
  padding: 16px;
  background-image: linear-gradient(135deg, #3b82f6, #16a34a, #ef4444, #eab308);
`;

export const FactPostForm = ({
  hideModal,
  categories,
  getFacts,
  setResponse,
  isEdit,
  editFormObj,
}) => {
  const [form, setForm] = useState(isEdit ? editFormObj : {});

  const inputs = [
    {
      type: "text",
      name: "fact",
      maxLength: "200",
      placeholder: "share a fact...",
      required: true,
      value: form.fact,
    },
    {
      type: "text",
      name: "source",
      placeholder: "trustworthy source...",
      required: true,
      value: form.source,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = await addNewFact(form);

    if (data.status === "success") {
      setResponse("");
      getFacts();
    }
  };

  const handleOnEdit = async (e) => {
    e.preventDefault();
    console.log(editFormObj._id);
    const { _id } = editFormObj._id;

    const data = await updateFactById({ _id, ...form });
    if (data.status === "success") {
      setResponse("");
      getFacts();
    }
  };

  return (
    <>
      <ModForm
        className="shadow-lg border rounded p-3"
        onSubmit={isEdit ? handleOnEdit : handleOnSubmit}
      >
        <Row>
          {inputs.map((item, i) => (
            <Col key={i}>
              <CustomInput {...item} onChange={handleOnChange} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <IpFormSelect
                name="category"
                onChange={handleOnChange}
                value={form.category}
              >
                <option value="">-- choose category --</option>
                {categories.map((item, i) => (
                  <option value={item.name} key={i}>
                    {item.name}
                  </option>
                ))}
              </IpFormSelect>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <div>
                <BtnSubmit type="submit" onClick={hideModal}>
                  {isEdit ? "Update" : "Post"}
                </BtnSubmit>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </ModForm>
    </>
  );
};
