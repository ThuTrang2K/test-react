import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import "./add.scss";

const schemaValidation = Yup.object({
    firstName: Yup.string()
      .required("Please enter your first name")
      .max(10, "Must be 10 characters or less"),
  });

const Add = () => {
    const {register, handleSubmit, reset, formState:{errors,isValid}}= useForm({resolver: yupResolver(schemaValidation), mode:"onChange"});
    const onSubmit = async (values) =>{
      console.log("isValid",isValid);
        if(isValid) {
            console.log("sendata");
            // const response =await axios.push
            reset({
              firstName:"",
              lastname:""
            })
        }

        console.log(values);
    } 
    return (
       <div className="overlay">
         <form onSubmit={handleSubmit(onSubmit)}
      className="row login-container"
      autoComplete="off"
    >
      <div className="login-group">
        <label htmlFor="firstName">Firstname</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          className="login-input"
        {...register("firstName")}
        />
        {errors?.firstName && (
          <div className="text-danger">
            {errors.firstName?.message}
          </div>
        )}
       
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your first name"
          className="p-4 rounded-md border border-gray-100"
          {...register("lastName")}
        />
       
      </div>
      <div className="login-content">
      <div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg"
        >
          Submit
        </button>
      </div>
      </div>
    </form>
       </div>
    );
};

export default Add;