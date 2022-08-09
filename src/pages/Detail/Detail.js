import axios from "axios";
import "../Add/add.scss";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, DatePicker, Radio, Modal } from "antd";
import moment from "moment";
import {provider, useInstance} from "react-ioc"
import { observer } from "mobx-react-lite";
import UserDetailsViewStore from "../../store/UserDetailsViewStore";


const Detail = provider(UserDetailsViewStore)(observer(() => {
    const userDetailsStore = useInstance(UserDetailsViewStore)
    const data = userDetailsStore.userDetail
    console.log("hello",data);
    // const [data, setData] = useState([]);
    let navigate = useNavigate();
    const { id } = useParams();
    

//     useEffect(() => {
//         if (id) {
//             getSingleStudent(id);
//         }
//     }, [id]);
//     const getSingleStudent = async (idStudent) => {
//         const response = await axios.get(
//             `https://prod.example.fafu.com.vn/employee/${idStudent}`
//         );
//         const result = response.data;
// 
//         result.gender = result.gender === 1 ? "male" : "female";
//         console.log("bitrh1", result.birthday);
//         result.birthday = new Date(result.birthday).toISOString().slice(0,10);
//         console.log("bitrh2", result.birthday);
//         setData(result);
//         form.setFieldsValue({
//             username: result.username,
//             firstname: result.firstname,
//             lastname: result.lastname,
//             address: result.address,
//             email: result.email,
//             birthday: moment(result.birthday, 'YYYY-MM-DD'),
//             phone: result.phone,
//             gender: result.gender,
//         });
//     };
    const deleteStudent = () => {
        // userDetailsStore.deleteUser;
        // const response = await axios.delete(
        //     `https://prod.example.fafu.com.vn/employee/${id}`
        // );

         setTimeout(() => navigate(-1), 500);
    };

    const EditStudent = async (data) => {
        const response = await axios.put(
            `http://prod.example.fafu.com.vn/employee/${id}?`,
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
    };

    const handleDelete = () => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa?",
            onOk: () => {
                deleteStudent();
            },
        });
    };
    const [form] = Form.useForm();
    {data &&
        form.setFieldsValue({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        email: data.email,
        birthday: moment(data.birthday, 'YYYY-MM-DD'),
        phone: data.phone,
        gender: data.gender,
    });
}
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            birthday: fieldsValue["birthday"].toISOString(),
            gender: fieldsValue["gender"] === "male" ? 1 : 0,
        };
        console.log("value", values);
        EditStudent(values);
        setTimeout(() => navigate(-1), 500);
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
    if (!data) return null;
    return (
        <div className="edit-form ">
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {console.log(data)}
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
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button className="mx-2" onClick={handleDelete}>
                        Xóa
                    </Button>
                    <Button onClick={() => navigate(-1)}>
                        Đóng
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}));

export default Detail;
