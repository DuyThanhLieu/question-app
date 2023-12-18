
// phan trang
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';



// const items = [...Array(33).keys()];

// function Items({ currentItems }) {
//     return (
//         <div className="items">
//             {currentItems && currentItems.map((item) => (
//                 <div>
//                     <h3>Item #{item}</h3>
//                 </div>
//             ))}
//         </div>
//     );
// }

// const PaginatedItems = ({ itemsPerPage }) => {
//     // We start with an empty list of items.
//     const [currentItems, setCurrentItems] = useState(null);

//     // Here we use item offsets; we could also use page offsets
//     // following the API or data you're working with.
//     const [itemOffset, setItemOffset] = useState(0);

//     useEffect(() => {
//         // Fetch items from another resources.
//         const endOffset = itemOffset + itemsPerPage;
//         console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//         setCurrentItems(items.slice(itemOffset, endOffset));
//         setPageCount(Math.ceil(items.length / itemsPerPage));
//     }, [itemOffset, itemsPerPage]);



//     return (
//         <>
//             <Items currentItems={currentItems} />

//         </>
//     );
// }
const TableUserPaginate = (props) => {
    const { ListUsers, pageCount } = props;
    // const [pageCount, setPageCount] = useState(0);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected + 1} `); //string + number tra ra string can them dau cong
        props.fetchListUsersWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
    };

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
                                        <button className='btn btn-secondary'
                                            onClick={() => props.handleClickBtnView(item)}
                                        >View</button>
                                        <button className='btn btn-warning mx-3'
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >Update</button>
                                        <button className='btn btn-danger'
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >
                                            Delete</button>
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
            {/* <PaginatedItems itemsPerPage={5} /> */}
            <div className='user-paginatetion'>
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1} // quay ve trang dau
                />
            </div>

        </>
    )
}
export default TableUserPaginate;