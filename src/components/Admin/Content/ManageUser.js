import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
// import TableUser from "./TableUser";
import { getAllUsers, getUserWithPaginate } from '../../../services/apiServices';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const LIMIT_USRER = 6;
    const [pageCount, setPageCount] = useState(0);// pageCount = 0 khi khong co nguoi dung nao  trong bd thi ko hien natigate

    const [ShowModalCreateUser, setShowModalCreateUser] = useState(false);
    const [ShowModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [ShowModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUpdateUser, setDataUpdateUser] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [DataDeleteUser, setDataDeleteUser] = useState({});

    const [ListUsers, setListUsers] = useState([])
    //componentDidMount
    useEffect(() => {
        // fetchListUsers lay tat ca nguoi dung
        fetchListUsersWithPaginate(1) //lay nguoi dung theo phan trang
    }, []);
    //truyen [] de chay 1 lan
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        // console.log(res);
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USRER)
        console.log(res.DT);
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)// pageCount = 0 khi khong co nguoi dung nao  trong bd thi ko hien natigate
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdateUser(user);
        // console.log('update user', user);

    }
    const handleClickBtnView = (user) => {
        console.log('Check views')
        setShowModalViewUser(true);
        setDataUpdateUser(user);
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDeleteUser(user);
    }
    const resetUpdateDataUser = () => {
        setDataUpdateUser({})
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
                    {/* <TableUser/>
                    // props cha truyen cho con */}
                    <TableUserPaginate
                        ListUsers={ListUsers}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                    />

                </div>
                <ModalCreateUser
                    show={ShowModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                // testFunciton={testFunction}
                />
                <ModalViewUser
                    show={ShowModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdateUser={dataUpdateUser}
                />
                <ModalUpdateUser
                    show={ShowModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdateUser={dataUpdateUser}
                    fetchListUsers={fetchListUsers}
                    resetUpdateDataUser={resetUpdateDataUser}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}//truyen sang cho component con
                    DataDeleteUser={DataDeleteUser}//cha truyen cho con su dung
                    fetchListUsers={fetchListUsers}
                />

            </div>
        </div >
    )
}

export default ManageUser;