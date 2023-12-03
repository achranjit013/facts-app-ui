import React, { useState } from "react";
import { Button, Col, Form, FormSelect, Row } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { styled } from "styled-components";
import { addNewFact, updateFactById } from "../helper/axiosHelper";
import { toast } from "react-toastify";

// css
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

  @media (max-width: 768px) {
    width: 300px;
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

  @media (max-width: 768px) {
    width: 300px;
  }
`;
// end css

export const FactPostForm = ({
  hideModal,
  categories,
  getFacts,
  isEdit,
  editFormObj,
}) => {
  const initialState = {
    fact: "",
    source: "",
    category: "",
  };

  const [form, setForm] = useState(isEdit ? editFormObj : initialState);

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

  // checking source url
  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const checkSourceURL = isValidHttpUrl(form.source);
    let alertMessage = "";
    let alertStatus = "";

    if (checkSourceURL) {
      const data = await addNewFact(form);

      alertStatus = data.status;
      alertMessage = data.message;

      data.status === "success" && getFacts() && hideModal();
    } else {
      alertStatus = "error";
      alertMessage = "Please check your source url and try again!";
    }

    toast[alertStatus](alertMessage, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleOnEdit = async (e) => {
    e.preventDefault();

    const { _id } = editFormObj._id;

    const checkSourceURL = isValidHttpUrl(form.source);
    let alertMessage = "";
    let alertStatus = "";

    if (checkSourceURL) {
      const data = await updateFactById({ _id, ...form });

      alertStatus = data.status;
      alertMessage = data.message;

      data.status === "success" && getFacts() && hideModal();
    } else {
      alertStatus = "error";
      alertMessage = "Please check your source url and try again!";
    }

    toast[alertStatus](alertMessage, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
                required
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
                <BtnSubmit type="submit">
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
