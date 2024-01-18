import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => setShow(false);
    // const handleSubmidDeleteUser = async () => {
    //     let data = await deleteUser(DataDeleteUser.id)
    //     // console.log('>>>>>component res:', data);
    //     //check dieu kien tao user thanh cong
    //     if (data && data.EC === 0) {
    //         toast.success(data.EM)
    //         handleClose();
    //         props.setCurrentPage(1)//cho ve trang 1 
    //         // await props.fetchListUsers();
    //         await props.fetchListUsersWithPaginate(1)// mac dinh la trang 1 
    //         //goi lai du lieu khi xoa user
    //         // con goi len cha 
    //     }
    //     if (data && data.EC !== 0) {
    //         toast.error(data.EM);
    //     }
    //     //khong can truyen tham so dau vao cho ham vi da co user roi 
    // }

    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static" //khong cho click ra ngoai 
            >
                <Modal.Header closeButton>
                    <Modal.Title>You Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        ToTal Question: <b>{dataModalResult.countCorrect}</b>
                    </div>
                    <div>
                        ToTal Correct answers: <b>{dataModalResult.countTotal}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answers
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;