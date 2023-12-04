import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from '../../../services/apiServices';
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
    const [ShowModalCreateUser, setShowModalCreateUser] = useState(false);
    const [ShowModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdateUser, setDataUpdateUser] = useState({});

    const [ListUsers, setListUsers] = useState([])
    //componentDidMount
    useEffect(() => {
        fetchListUsers();
    }, []);
    //truyen [] de chay 1 lan
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        // console.log(res);
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdateUser(user);
        console.log('update user', user);
    }

    return (
        <div className='manage-user-container'>
            <div className='title'>
                Manage User
            </div>
            <div className='users-content'>
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus />Add new users</button>
                </div>
                <div className="table-users-container">
                    <TableUser ListUsers={ListUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate} />
                </div>
                <ModalCreateUser show={ShowModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                // testFunciton={testFunction}
                />
                <ModalUpdateUser
                    show={ShowModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdateUser={dataUpdateUser}
                />
            </div>
        </div >
    )
}

export default ManageUser;