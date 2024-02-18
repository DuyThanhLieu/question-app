import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiServices'
import { toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, DataDeleteQuiz } = props;

    const handleClose = () => setShow(false);
    const handleSubmidDeleteQuiz = async () => {
        let data = await deleteQuiz(DataDeleteQuiz.id)
        console.log('>>>>>component res:', data);
        //check dieu kien tao user thanh cong
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            props.setCurrentPage(1)//cho ve trang 1 
            // await props.fetchListUsers();
            await props.fetchListUsersWithPaginate(1)// mac dinh la trang 1 
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
                    <Modal.Title>Confirm Delete the Quiz ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user name : <b>{DataDeleteQuiz && DataDeleteQuiz.name ? DataDeleteQuiz.name : " "}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmidDeleteQuiz}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalDeleteQuiz;