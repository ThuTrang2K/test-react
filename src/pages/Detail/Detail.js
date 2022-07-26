import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../Add/add.scss";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const schema = yup.object({
    username: yup.string().required("Bắt buộc"),
    firstname: yup.string().required("Bắt buộc"),
    lastname: yup.string().required("Bắt buộc"),
    address: yup.string().required("Bắt buộc"),
    birthday: yup.date().required("Bắt buộc"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    phone: yup.string().min(10).required("Bắt buộc"),
    gender: yup
        .string()
        .required("Please select your gender")
        .oneOf(["male", "female"], "You can only select male or female"),
});
const Detail = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const onSubmitHandler = (values, e) => {
        // console.log("isValid",isValid);
        const newValue = {
            ...values,
            gender: values.gender === "male" ? 1 : 0,
            birthday: new Date(values.birthday).toISOString(),
        };
        console.log(newValue);
        console.log(isValid);
        if (!isValid) return;
        axios
            .put(`http://prod.example.fafu.com.vn/employee/${id}?`, {
                username: newValue.username,
                firstname: newValue.firstname,
                lastname: newValue.lastname,
                email: newValue.email,
                phone: newValue.phone,
                address: newValue.address,
                birthday: newValue.birthday,
                gender: newValue.gender,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
            })
            .catch(function (errors) {
                console.log(errors);
            });
        reset({
            username: "",
            firstname: "",
            lastname: "",
            address: "",
            birthday: "",
            email: "",
            phone: "",
            gender: "",
        });
    };

    let { id } = useParams();
    let navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`https://prod.example.fafu.com.vn/employee/${id}`)
            .then((response) => {
                setData(response.data);
            });
    }, []);
    const deletePost = () => {
        axios
            .delete(`http://prod.example.fafu.com.vn/employee/${id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch(function (errors) {
                console.log(errors);
            });
        navigate("/");
    };



    return (
        <div>
            <div className="login login-content">
                <form onSubmit={handleSubmit(onSubmitHandler)} className="row ">
                    <div className="login-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="login-input"
                            placeholder="Type your username"
                            name="username"
                            defaultValue={data&& data.username ? `${data.username}`: ''}
                            {...register("username")}
                        />
                        {errors?.username && (
                            <p className="text-danger">
                                {errors.username?.message}
                            </p>
                        )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Họ(đệm)(*):</label>
                        <input
                            type="text"
                            className="login-input"
                            name="lastname"
                            defaultValue={data && data.lastname? `${data.lastname}`: ''}
                            {...register("lastname")}
                        />
                        {errors?.lastname && (
                            <p className="text-danger">
                                {errors.lastname?.message}
                            </p>
                        )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Tên(*):</label>
                        <input
                            type="text"
                            className="login-input"
                            name="firstname"
                            defaultValue={data.firstname&& `${data.firstname}`}
                            {...register("firstname")}
                        />
                        {errors?.firstname && (
                            <p className="text-danger">
                                {errors.firstname?.message}
                            </p>
                        )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Email(*):</label>
                        <input
                            type="email"
                            className="login-input"
                            name="email"
                            defaultValue={data.email? `${data.email}`: ''}
                            {...register("email")}
                        />
                        {errors?.email && (
                            <p className="text-danger">
                                {errors.email?.message}
                            </p>
                        )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Điện thoại(*):</label>
                        <input
                            type="text"
                            className="login-input"
                            name="phone"
                            defaultValue={data.phone? `${data.phone}`: ''}
                            {...register("phone")}
                        />
                        {errors?.phone && (
                            <p className="text-danger">
                                {errors.phone?.message}
                            </p>
                        )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Địa chỉ(*):</label>
                        <input
                            type="text"
                            className="login-input"
                            name="address"
                            defaultValue={data.address? `${data.address}`: ''}
                            {...register("address")}
                        />
                        {errors?.address && (
                            <p className="text-danger">
                                {errors.address?.message}
                            </p>
                        )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Ngày sinh(*):</label>
                        <input
                            type="date"
                            className="login-input"
                            name="birthday"
                            
                            defaultValue={data.birthday?  `${new Date(data.birthday)}` : ''}
                            {...register("birthday")}
                        />
                        {errors?.birthday && (
                            <p className="text-danger">
                                {errors.birthday?.message}
                            </p>
                        )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Giới tính(*):</label>
                        <div className="d-flex justify-content-start">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                               
                                checked={data.gender && data.gender===1? true: null}
                                {...register("gender")}
                            />
                            <span>Nam</span>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={data.gender && data.gender===0? true: null}
                                {...register("gender")}
                            />
                            <span>Nữ</span>
                        </div>
                        {errors?.gender && (
                            <p className="text-danger">
                                {errors.gender?.message}
                            </p>
                        )}
                    </div>
                    {data && (
                        <>
                            <button
                                className="login-button me-4"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Đóng
                            </button>
                            <button className="login-button me-4" onClick={deletePost}>Xóa</button>
                            <button className="login-button me-4" type="submit" >Cập nhật</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Detail;
