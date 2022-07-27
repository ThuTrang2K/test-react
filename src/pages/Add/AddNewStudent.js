import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./add.scss";
import axios from "axios";

const schema = yup.object({
    username: yup.string().required("Bắt buộc"),
    firstname: yup.string().required("Bắt buộc"),
    lastname: yup.string().required("Bắt buộc"),
    address: yup.string(),
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
const AddNewStudent = ({
    setShow = "",
    forceUpdate = "",
    dataDetail = "",
    setCurrentPage = "",
}) => {
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
        e.preventDefault();
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
            .post(`https://prod.example.fafu.com.vn/employee`, {
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
        forceUpdate();
        setCurrentPage(1);
        setShow(false);
    };

    return (
        <div className="overlay">
            <div className="login login-content">
                <form onSubmit={handleSubmit(onSubmitHandler)} className="row ">
                    <div className="login-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="login-input"
                            placeholder="Type your username"
                            name="username"
                            defaultValue={
                                dataDetail && dataDetail.username
                                    ? `${dataDetail.username}`
                                    : ""
                            }
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
                            placeholder="Type your lastname"
                            type="text"
                            className="login-input"
                            name="lastname"
                            defaultValue={
                                dataDetail && dataDetail.lastname
                                    ? `${dataDetail.lastname}`
                                    : ""
                            }
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
                            placeholder="Type your firstname"
                            className="login-input"
                            name="firstname"
                            defaultValue={
                                dataDetail.firstname
                                    ? `${dataDetail.firstname}`
                                    : ""
                            }
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
                            placeholder="Type your email"
                            type="email"
                            className="login-input"
                            name="email"
                            defaultValue={
                                dataDetail.email ? `${dataDetail.email}` : ""
                            }
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
                            placeholder="Type your phone"
                            type="text"
                            className="login-input"
                            name="phone"
                            defaultValue={
                                dataDetail.phone ? `${dataDetail.phone}` : ""
                            }
                            {...register("phone")}
                        />
                        {errors?.phone && (
                            <p className="text-danger">
                                {errors.phone?.message}
                            </p>
                        )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Địa chỉ:</label>
                        <input
                            placeholder="Type your address"
                            type="text"
                            className="login-input"
                            name="address"
                            defaultValue={
                                dataDetail.address
                                    ? `${dataDetail.address}`
                                    : ""
                            }
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
                            defaultValue={
                                dataDetail.birthday
                                    ? `${new Date(dataDetail.birthday)}`
                                    : ""
                            }
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
                                checked={
                                    dataDetail.gender && dataDetail.gender === 1
                                        ? true
                                        : null
                                }
                                {...register("gender")}
                            />
                            <span>Nam</span>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={
                                    dataDetail.gender && dataDetail.gender === 0
                                        ? true
                                        : null
                                }
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

                    <>
                        <button type="submit" className="login-button me-4">
                            Tạo
                        </button>
                        <button
                            onClick={() => setShow(false)}
                            className="login-button"
                        >
                            Đóng
                        </button>
                    </>
                </form>
            </div>
        </div>
    );
};

export default AddNewStudent;
