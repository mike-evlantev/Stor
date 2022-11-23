import * as React from "react";
import { Button, Modal } from "react-bootstrap";

interface ModalProps {
    onHide: () => void;
    onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ModalProps> = ({onConfirm, onHide}) => {
    return (
        <Modal show size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>You sure, bro?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onConfirm} className="ml-2">Confirm</Button>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}