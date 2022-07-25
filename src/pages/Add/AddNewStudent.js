import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./add.scss";

const schema = yup.object({
    username: yup.string().required("Please enter "),
    firstname: yup.string().required("Please enter "),
    lastname: yup.string().required("Please enter "),
    address: yup.string().required("Please enter "),
    birthday: yup.date().required("Please enter "),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    phone: yup.string().min(10).required("Please enter "),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
                message:
                    "at least one uppercase letter, one lowercase letter, one number and one special character",
            }
        )
        .required("Please enter your password"),
    gender: yup
        .string()
        .required("Please select your gender")
        .oneOf(["male", "female"], "You can only select male or female"),
});
const AddNewStudent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });
    const onSubmitHandler = (values) => {
        console.log("hello");
        if (!isValid) return;
        console.log(values);
        reset({
            username: "",
            firstname: "",
            lastname: "",
            address: "",
            birthday: "",
            email: "",
            phone: "",
            password: "",
            gender: "",
        });
    };
    return (
        <div  className="login">
            <form onSubmit={handleSubmit(onSubmitHandler)} className="row login-container container-fluid g-0">
                <div className="login-content ">
                    <div className="login-group">
                        <label htmlFor="">Tên đăng nhập</label>
                        <input control={control}
                            type="text"
                            className="login-input"
                            placeholder="Type your username"
                            name="username"
                            {...register("username")}
                        />
                        {errors.username && (
                        <p className="text-danger">
                            {errors.username.message}
                        </p>
                    )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Họ(đệm)(*):</label>
                        <input control={control}
                            type="text"
                            className="login-input"
                            name="lastname"
                            {...register("lastname")}
                        />
                        {errors.lastname && (
                        <p className="text-danger">
                            {errors.lastname.message}
                        </p>
                    )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Tên(*):</label>
                        <input control={control}
                            type="text"
                            className="login-input"
                            name="firstname"
                            {...register("firstname")}
                        />
                        {errors.firstname && (
                        <p className="text-danger">
                            {errors.firstname.message}
                        </p>
                    )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Email(*):</label>
                        <input control={control}
                            type="email"
                            className="login-input"
                            name="email"
                            {...register("email")}
                        />
                        {errors.email && (
                        <p className="text-danger">
                            {errors.email.message}
                        </p>
                    )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Điện thoại(*):</label>
                        <input control={control}
                            type="text"
                            className="login-input"
                            name="phone"
                            {...register("phone")}
                        />
                        {errors.phone && (
                        <p className="text-danger">
                            {errors.phone.message}
                        </p>
                    )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Địa chỉ(*):</label>
                        <input control={control}
                            type="text"
                            className="login-input"
                            name="address"
                            {...register("address")}
                        />
                        {errors.address && (
                        <p className="text-danger">
                            {errors.address.message}
                        </p>
                    )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Ngày sinh(*):</label>
                        <input control={control}
                            type="date"
                            className="login-input"
                            name="birthday"
                            {...register("birthday")}
                        />
                        {errors.birthday && (
                        <p className="text-danger">
                            {errors.birthday.message}
                        </p>
                    )}
                    </div>
                    <div className="login-group">
                        <label htmlFor="">Giới tính(*):</label>
                        <div className="d-flex justify-content-start">
                            <input control={control} type="radio" name="gender" value="male" 
                                {...register("gender")}
                            />
                            <span>Nam</span>
                            <input control={control} type="radio" name="gender" value="female" {...register("gender")}/>
                            <span>Nữ</span>
                        </div>
                        {errors.lastname && (
                        <p className="text-danger">
                            {errors.lastname.message}
                        </p>
                    )}
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewStudent;
