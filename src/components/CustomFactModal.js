import React from "react";
import { Modal, ModalTitle } from "react-bootstrap";
import { styled } from "styled-components";

const MTitle = styled(ModalTitle)`
  font-family: "Coiny", sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  color: black;
`;

export const CustomFactModal = ({ children, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <MTitle id="contained-modal-title-vcenter">
          {props.isedit === "true" ? "Update fact" : "Post new fact"}
        </MTitle>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
