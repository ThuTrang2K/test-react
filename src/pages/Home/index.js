import React, { useEffect,  useReducer,  useState } from "react";
import "./home.scss";
import AddNewStudent from "../Add/AddNewStudent";
import usePagination from "../../hooks/usePagination";
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    console.log("re");
     useEffect(() => {
        console.log("loading");
        fetch(`https://prod.example.fafu.com.vn/employee?page=0&size=10`)
            .then((response) => response.json())
            .then((json) => setData(json.data));
    }, [reducerValue]);

    const {
        setCurrentPage,
        currentItems,
        handlePrevBtn,
        currentPage,
        pageDecrementBtn,
        renderPageNumbers,
        pageIncrementBtn,
        handleNextBtn,
        pages,
    } = usePagination({ data, setData });
    const [show, setShow] = useState(false);

    return (
        <div className="container-fluid p-5">
            <div className="d-flex justify-content-between ">
                <h1>Hệ thống quản lý sinh viên</h1>
                <button onClick={() => setShow(true)}>Tạo mới</button>
            </div>
            {show && (
                <AddNewStudent
                    setCurrentPage={setCurrentPage}
                    setShow={setShow}
                    forceUpdate={forceUpdate}
                />
            )}

            <table>
                <thead>
                    <tr>
                        <th>Tên đăng nhập</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {isError === false &&
                        isLoading === false && */}
                    {currentItems &&
                        currentItems.length > 0 &&
                        currentItems.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <Link
                                            className="link-detail"
                                            to={`/student/${item.id}`}
                                        >
                                            {item.username}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            className="link-detail"
                                            to={`/student/${item.id}`}
                                        >
                                            {item.lastname
                                                ? item.lastname
                                                : "Rỗng"}{" "}
                                            {item.firstname}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            className="link-detail"
                                            to={`/student/${item.id}`}
                                        >
                                            {item.email}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            className="link-detail"
                                            to={`/student/${item.id}`}
                                        >
                                            {item.phone}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <div className="mt-5 text-center">
                <nav aria-label="Page navigation example d-inline ">
                    <ul className="pagination justify-content-center">
                        <button
                            className="page-link"
                            onClick={handlePrevBtn}
                            disabled={currentPage === pages[0] ? true : false}
                        >
                            Previous
                        </button>
                        {pageDecrementBtn}
                        {renderPageNumbers}
                        {pageIncrementBtn}
                        <button
                            className="page-link"
                            onClick={handleNextBtn}
                            disabled={
                                currentPage === pages[pages.length - 1]
                                    ? true
                                    : false
                            }
                        >
                            Next{" "}
                        </button>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Home;
