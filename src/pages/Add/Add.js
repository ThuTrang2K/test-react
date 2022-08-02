import React, { useState } from "react";
import { Button, Checkbox, Form, Input, DatePicker, Radio } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = ({ handleClose,getStudents }) => {
    const AddStudent = async (data) => {
        const responce = await axios.post(
            `https://prod.example.fafu.com.vn/employee`,
            {
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                address: data.address,
                birthday: data.birthday,
                gender: data.gender,
            }
        );
        if(responce.status ===200){
            getStudents();
        }
    };
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            birthday: fieldsValue["birthday"].toISOString(),
            gender: fieldsValue["gender"] === "male" ? 1 : 0,
        };
        console.log("value", values);
        AddStudent(values);
        handleClose();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const config = {
        rules: [
            {
                type: "object",
                required: true,
                message: "Nhập ngày sinh!",
            },
        ],
    };

    return (
        <div className="overlay">
            <div className="add-model">
                <h1>Thêm sinh viên</h1>
                <Form
                    className="mt-5 w-50 mx-auto "
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Bắt buộc!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Họ(đệm)"
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: "Bắt buộc!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên"
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: "Bắt buộc!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Bắt buộc!",
                            },
                            {
                                type: "email",
                                message: "Email không hợp lệ!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Bắt buộc!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
                        <Input />
                    </Form.Item>
                    <Form.Item name="birthday" label="Ngày sinh" {...config}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Giới tính"
                        rules={[
                            {
                                required: true,
                                message: "Bắt buộc!",
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value="male">Nam</Radio>
                            <Radio value="female">Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" className="mx-2" htmlType="submit">
                            Submit
                        </Button>
                        <Button onClick={handleClose}>
                            Đóng
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Add;
