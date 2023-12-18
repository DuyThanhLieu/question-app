import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiServices';
import { toast } from 'react-toastify';
const ModalDeleteUser = (props) => {
    const { show, setShow, DataDeleteUser } = props;

    const handleClose = () => setShow(false);
    const handleSubmidDeleteUser = async () => {
        let data = await deleteUser(DataDeleteUser.id)
        // console.log('>>>>>component res:', data);
        //check dieu kien tao user thanh cong
        if (data && data.EC === 0) {
            toast.success(data.EM) 
            handleClose();
            await props.fetchListUsers();
            //goi lai du lieu khi xoa user
            // con goi len cha 
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        //khong can truyen tham so dau vao cho ham vi da co user roi 
    }

    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static" //khong cho click ra ngoai 
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user.email <b>{DataDeleteUser && DataDeleteUser.email ? DataDeleteUser.email : " "}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmidDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;