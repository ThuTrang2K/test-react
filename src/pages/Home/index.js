import React, { useEffect, useState } from "react";

import "./home.scss";

import usePagination from "../../hooks/usePagination";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import "antd/dist/antd.css";
import axios from "axios";
import { Button, Radio, Table } from "antd";
import Add from "../Add/Add";
import {provider, useInstance} from "react-ioc"

import queryString from "query-string";
import UserModalViewStore from "../../store/UserModalViewStore";
import {observer} from 'mobx-react-lite'
import UserListViewStore from "../../store/UserListViewStore";

const Home =provider(UserListViewStore)(observer(() => {
    const modalStore = useInstance(UserModalViewStore);
    const userStore = useInstance(UserListViewStore)
    const [result, setResult] = useState([]);    
    const {search} = useLocation();
    let {page} =  queryString.parse(search);

    const [curentPage, setCurentPage] = useState(Number(page)|| 0);
    const [searchParams, setSearchParams] = useSearchParams();
   
    console.log('param',page);

    // useEffect(() => {
    //     getStudents(curentPage);
    // }, [curentPage]);
    const getStudents = async (curentPage =0) => {
        const response = await axios.get(
            `https://prod.example.fafu.com.vn/employee?page=${curentPage}&size=10`
        );
        if (response.status === 200) {
            setResult(response.data);
        }
    };
    // const data = result.data;
    const total_page = result.total_page;

    

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
    const  handleClose= ()=>{
        setCurentPage(0);
        setSearchParams({page: curentPage})
        modalStore.close();
        // setShow(false);
    }

    return (
        <div className="container ">
            <div className="d-flex justify-content-between ">
                <h1>Hệ thống quản lý sinh viên</h1>
                <button className="add-btn" onClick={modalStore.open}>
                    Tạo mới
                </button>
            </div>
            {modalStore.opened && <Add handleClose={handleClose} getStudents={getStudents}/>}
            <Table columns={columns} dataSource={userStore.users} />
            <div className="mt-5 mb-5 text-center">
                <nav aria-label="Page navigation example d-inline ">
                    <ul className="pagination justify-content-center">
                        <button
                            className="page-link"
                            onClick={() => {
                                setCurentPage(curentPage-1);
                                setSearchParams({page: curentPage-1})}}
                            disabled={curentPage === 0 ? true : false}
                        >
                            Previous
                        </button>
                        {new Array(total_page).fill(0).map((item, index) => (
                            <li
                                
                                class={`page-link ${
                                    curentPage === index ? "active" : ""
                                }`}
                                onClick={() => {
                                    setCurentPage(index);
                                    setSearchParams({page: index})}}
                            >
                                {index + 1}
                            </li>
                        ))}
                        <button
                            className="page-link"
                            onClick={() => {
                                setCurentPage(curentPage+1);
                                setSearchParams({page: curentPage+1})}}
                            disabled={curentPage === total_page - 1 ? true : false}
                        >
                            Next{" "}
                        </button>
                    </ul>
                </nav>
            </div>
        </div>
    );
})) ;

export default Home;
