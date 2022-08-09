import React, { useContext, useEffect, useState } from "react";

import "./home.scss";

import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
import { Button, Radio, Table, Pagination } from "antd";
import Add from "../AddUser/Add";

import queryString from "query-string";
import { observer } from "mobx-react-lite";
import { StudentContext } from "../../context";

const Home = observer(() => {
    const { userStore, modelStore } = useContext(StudentContext);
    const [result, setResult] = useState([]);
    const { search } = useLocation();
    let { page } = queryString.parse(search);

    const [curentPage, setCurentPage] = useState(Number(page) || 0);
    const [searchParams, setSearchParams] = useSearchParams();

    console.log("param", page);

    useEffect(() => {
        userStore.getUsers(curentPage);
    }, [curentPage]);


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
    const handleClose = () => {
        setCurentPage(0);
        setSearchParams({ page: 0 });
        modelStore.close();
    };

    return (
        <div className="container ">
            <div className="d-flex justify-content-between ">
                <h1>Hệ thống quản lý sinh viên</h1>
                <button className="add-btn" onClick={modelStore.open}>
                    Tạo mới
                </button>
            </div>
            {modelStore.opened && (
                <Add handleClose={handleClose}/>
            )}
            <Table columns={columns} dataSource={userStore.usersList} />
            <Pagination
                className="pagination"
                total={userStore.total}
                onChange={(page, pageSize) => {
                    setCurentPage(page - 1);
                    setSearchParams({ page: page - 1 });
                }}
            />
        </div>
    );
});

export default Home;
