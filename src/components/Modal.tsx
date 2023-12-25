import React, { type ReactNode } from "react";
import Modal from "react-bootstrap/Modal";

type ModalContainerProps = {
  children: ReactNode;
  heading: string;
  show: boolean;
  close?: () => void;
};

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  heading,
  show,
  close,
}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
