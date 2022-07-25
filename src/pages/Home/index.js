import React, { useEffect, useRef, useState } from "react";
import Usefetch from "../../customize/fetch";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import "./home.scss";
import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import AddNewStudent from "../Add/AddNewStudent";


const Home = () => {
    const {data,isLoading,isError} =Usefetch(`https://prod.example.fafu.com.vn/employee?page=0&size=10`,true);
    
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
