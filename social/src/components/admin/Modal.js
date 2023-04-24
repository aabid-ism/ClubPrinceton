import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent({ isModal, setModal, title, children, onSubmit }) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        setModal(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        // console.log("use effect fired!")
        if (isModal) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [isModal]);

    return (
        <>
            <Modal
                show={show}
                onShow={handleShow}
                onEntering={handleShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" type='submit' >Submit</Button> */}
                {/* </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default ModalComponent;