import React, { useEffect, useRef, useState } from "react";
import Usefetch from "../../customize/fetch";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import "./home.scss";
import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import AddNewStudent from "../Add/AddNewStudent";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const axios = require("axios").default;
function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div>
              <h3>Item #{item}</h3>
            </div>
          ))}
      </>
    );
  }
  
  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
}

const Home = () => {
    const {data,isLoading,isError} =Usefetch(`https://prod.example.fafu.com.vn/employee?page=0&size=10`,true);


    //     async function getUser() {
    //         try {
    //           const response = await axios.get('http://prod.example.fafu.com.vn/employee?page=0&size=10');
    //           console.log(response);
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       }
    //
    //     const [data, setData] = useState([]);
    //   const [query, setQuery] = useState("");
    //   const [loading, setLoading] = useState(true);
    //   const [errorMessage, setErrorMessage] = useState("");
    //   const handleFetchData = useRef({});
    //   const [url, setUrl] = useState(
    //     `http://prod.example.fafu.com.vn/employee?page=0&size=10`
    //   );
    //
    //   const isMounted = useRef(true);
    //
    //   handleFetchData.current = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await axios.get(url);
    //         console.log("respon",response);
    //         if (isMounted.current) {
    //             setData(response.data || []);
    //           setLoading(false);
    //         }
    //     } catch (error) {
    //       setLoading(false);
    //       setErrorMessage(`The error happend ${error}`);
    //     }
    //     // console.log(response.data);
    //     // if (response.data) {
    //     //   console.log(response.data.hits);
    //     // }
    //   };
    //   // const handleUpdateQuery = lodash.debounce((e) => {
    //   //   setQuery(e.target.value);
    //   // }, 1000);
    //   React.useEffect(() => {
    //     handleFetchData.current();
    //   }, [url]);
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div className="container-fluid p-5">
            <div className="d-flex justify-content-between ">
                <h1>Hệ thống quản lý sinh viên</h1>
                <button onClick={handleShow}>Tạo mới</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo mới</Modal.Title>
                </Modal.Header>
                <Modal.Body className="h-auto">
                    <AddNewStudent/>
                    {/* <AddNewBlog handleAddNew={handleAddNew} /> */}
                </Modal.Body>
            </Modal>
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
                    {data.data &&
                        data.data.length > 0 &&
                        data.data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.username}</td>
                                    <td>{item.lastname} {item.firstname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            );
                        })}
                    {/* {isLoading === true && <tr>isLoading...</tr>}
                    {isError === true && <tr>something wrong...</tr>} */}
                </tbody>
            </table>
            <div className="mt-5 text-center">
            <nav aria-label="Page navigation example d-inline ">
                <ul className="pagination justify-content-center">
                    <li className="page-item " >
                        <a className="page-link" href="#">
                            Previous
                        </a>
                    </li>
                    <li className="page-item active">
                        <a className="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            3
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            </div>
        </div>
    );
};

export default Home;
