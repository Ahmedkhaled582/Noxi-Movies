import axios from "axios";
import React, { useState } from "react";
import { Joi } from 'joi';
import { useNavigate } from "react-router-dom";

export default function Register() {

  const Joi = require('joi');
  const [errorList , setErrorList] = useState([])
  let navigate = useNavigate()
  const[isLoading , setIsLoading] = useState(false)
  const [error , setError] = useState("")


  const [ form , setForm] = useState({
    username: "",
    email:"",
    password:"",
    phone:""
})


function handleChange(e){
  setForm({...form, [e.target.name] : e.target.value})
}

async function handleSubmit(e){
  e.preventDefault()
  let validation = validatRegister();
  if(validation.error){
    setErrorList(validation.error.details)
  }else{
    setIsLoading(true)
    let {data} = await axios.post(`https://movie-app-l0g2.onrender.com/register` , form); 
    if(data.success === true){
     setIsLoading(false)
     navigate("/login")
    } else{
     setError(data.message)
     setIsLoading(false)
   }
  }

}


function validatRegister(){
  let scheme = Joi.object({
    username: Joi.string()
        .min(5)
        .max(15)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


    phone: Joi.number()
        .integer(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
  return scheme.validate(form , {abortEarly : false});

}


  return (
    <>
    <div className="container">
    {error.length>0? <div className="alert alert-danger my-2">{error}</div> : "" }
    
      <form onSubmit={handleSubmit} className="p-4">

      <h3 className="mb-5">Register Now</h3>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
          User Name
          </label>
          <input
          onChange={handleChange}
          name="username"
            type="text"
            className="form-control my-input"
          />
          {errorList.filter((err)=> err.context.label == 'username')[0]?<div className="alert alert-danger my-2">{errorList.filter((err)=>err.context.label == 'username')[0]?.message}</div> : ""}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
          onChange={handleChange}
          name="email"
            type="email"
            className="form-control my-input"
          />
          {errorList.filter((err)=> err.context.label == 'email')[0]?<div className="alert alert-danger my-2">{errorList.filter((err)=>err.context.label == 'email')[0]?.message}</div> : ""}

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          onChange={handleChange}
          name="password"
            type="password"
            className="form-control my-input"
          />
          {errorList.filter((err)=> err.context.label == 'password')[0]?<div className="alert alert-danger my-2">Password Invalid</div> : ""}

        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
          onChange={handleChange}
          name="phone"
            type="tel"
            className="form-control my-input"
          />
          {errorList.filter((err)=> err.context.label == 'phone')[0]?<div className="alert alert-danger my-2">{errorList.filter((err)=>err.context.label == 'phone')[0]?.message}</div> : ""}

        </div>

        <button type="submit" className="btn btn-primary">
         {isLoading === true ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
      </div>
    </>
  );
}
