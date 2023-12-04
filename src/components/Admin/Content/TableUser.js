
const TableUser = (props) => {
    const { ListUsers } = props;


    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr >
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ListUsers && ListUsers.length > 0 &&
                        ListUsers.map((item, index) => {
                            // index la so tt bat dau tu 0 ->1
                            //item la obj duoc lap
                            // console.log(index)
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className='btn btn-secondary'>View</button>
                                        <button className='btn btn-warning mx-3'
                                            onClick={() => props.handleClickBtnUpdate(item)}>Update</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {ListUsers && ListUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}> Not Found data</td>

                        </tr>}
                </tbody>
            </table>
        </>
    )
}
export default TableUser;