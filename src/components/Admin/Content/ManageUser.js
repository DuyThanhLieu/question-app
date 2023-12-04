import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from '../../../services/apiServices';

const ManageUser = (props) => {
    const [ShowModalCreateUser, setShowModalCreateUser] = useState(false);

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
    // function test
    const testFunction = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
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
                    <TableUser ListUsers={ListUsers} />
                </div>
                <ModalCreateUser show={ShowModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    testFunciton={testFunction}
                />
            </div>
        </div >
    )
}

export default ManageUser;