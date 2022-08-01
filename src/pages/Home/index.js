import React, { useEffect, useState } from "react";

import "./home.scss";

import usePagination from "../../hooks/usePagination";
import { Link, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
import { Button, Radio, Table } from "antd";
import Add from "../Add/Add";

const queryString = require("query-string");

const Home = () => {
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(0);
    const [show, setShow] = useState(false);
    useEffect(() => {
        getStudents();
    }, [page]);
    const getStudents = async () => {
        const response = await axios.get(
            `https://prod.example.fafu.com.vn/employee?page=${page}&size=10`
        );
        if (response.status === 200) {
            setResult(response.data);
        }
    };
    const data = result.data;
    const total_page = result.total_page;
    
     console.log('param',Location.search);
    const columns = [
        {
            dataIndex: "id",
        },
        {
            title: "Tên đăng nhập",
            dataIndex: "username",
            key: "id",
            render: (text, record) => (
                <Link to={`/student/${record.id}`}>{text || "Rỗng"}</Link>
            ),
        },
        {
            title: "Họ",
            dataIndex: "lastname",
            key: "lastname",
        },
        {
            title: "Tên",
            dataIndex: "firstname",
            key: "firstname",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
    ];
    function handleClose() {
        setShow(false);
        getStudents();
    }

    return (
        <div className="container ">
            <div className="d-flex justify-content-between ">
                <h1>Hệ thống quản lý sinh viên</h1>
                <button className="add-btn" onClick={() => setShow(true)}>
                    Tạo mới
                </button>
            </div>
            {show && <Add handleClose={handleClose} />}
            <Table columns={columns} dataSource={data} />
            <div className="mt-5 text-center">
                <nav aria-label="Page navigation example d-inline ">
                    <ul className="pagination justify-content-center">
                        <button
                            className="page-link"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0 ? true : false}
                        >
                            Previous
                        </button>
                        {new Array(total_page).fill(0).map((item, index) => (
                            <Link
                                to={`/?page=${page}`}
                                class={`page-link ${
                                    page === index ? "active" : ""
                                }`}
                                onClick={() => setPage(index)}
                            >
                                {index + 1}
                            </Link>
                        ))}
                        <button
                            className="page-link"
                            onClick={() => setPage(page + 1)}
                            disabled={page === total_page - 1 ? true : false}
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
