import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaValidation = Yup.object({
    firstName: Yup.string()
      .required("Please enter your first name")
      .max(10, "Must be 10 characters or less"),
  });

const Add = () => {
  const [data ,setData]=useState([])

  useEffect(() => {
    async function fetchData(){
      await axios
        .get(`https://prod.example.fafu.com.vn/employee/24`)
        .then((response) => {
            setData(response.data);
        });
    }
    fetchData();
}, []);


    const {register, handleSubmit, reset, formState:{errors,isValid}}= useForm({resolver: yupResolver(schemaValidation), mode:"onChange", defaultValues:{}});
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

        console.log("values",values);
    } 
    return (
        <form onSubmit={handleSubmit(onSubmit)}
      className="p-10 w-full max-w-[500px] mx-auto"
      autoComplete="off"
    >
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="firstName">Firstname</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          className="p-4 rounded-md border border-gray-100"
         defaultValue={data&& data.username ? `${data.username}`: ''}
        //  {...register("firstName",{required:true,maxLength:10, 
        //     pattern: reget
        //  })}
        {...register("firstName")}
        />
        {/* {errors?.firstName?.type ==="required" && <div className='text-red-500 text-sm'>Please fill out this field</div>}
        {errors?.firstName?.type ==="maxLength" && <div className='text-red-500 text-sm'>Must be 10 character or less</div>} */}
        {errors?.firstName && (
          <div className="text-red-500 text-sm">
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
          defaultValue={data && data.lastname? `${data.lastname}`: ''}
          {...register("lastName")}
        />
       
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
    );
};

export default Add;