import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalCreateUser.scss';
import { FcPlus } from 'react-icons/fc';
import axios from 'axios';

const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]); //
        } else {

            // setPreviewImage(""); ko uplao thi van hien thi anh 
        }
        console.log('upload file ', event.target.files[0])
        // cap lai state

    }
    const handSubmitCreateUser = async () => {

        //validate
        //call apiss
        // let data = {
        //     email: email,
        //     password: password,
        //     username: username,
        //     role: role,
        //     userImage: image,
        // }
        // console.log(data)
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);
        // goi dung method de thuc hien api dung muc dich
        let res = await axios.post('http://localhost:8081/api/v1/participant', data);
        console.log('>>>>>check res:', res);
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Show Dialog add new user
            </Button> */}

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static"
                className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input type="email"
                                class="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            // onchange xu li cac loai input voi state cho no no value vao o input
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-control" value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Role</label>
                            <select class="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label class="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image
                            </label>
                            <input type="file" id="labelUpload" hidden
                                onChange={(event) => handleUploadImage(event)} />
                            {/* them hidden de an icon mat dinh upload file di */}
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span> Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitCreateUser(Image)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
export default ModalCreateUser;