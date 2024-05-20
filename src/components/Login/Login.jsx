import axios from "axios";
import React, { useState } from "react";
import { Joi } from 'joi';
import { useNavigate } from "react-router-dom";

export default function Login({saveUserData}) {

  const Joi = require('joi');
  const [errorList , setErrorList] = useState([])
  let navigate = useNavigate()
  const[isLoading , setIsLoading] = useState(false)
  const [error , setError] = useState("")


  const [ form , setForm] = useState({
    email:"",
    password:""
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
    let {data} = await axios.post(`https://movie-app-l0g2.onrender.com/login` , form); 
    if(data.success === true){
     setIsLoading(false)
     localStorage.setItem('userToken', data.token )
     saveUserData()
     navigate("/")
    } else{
     setError(data.message)
     setIsLoading(false)
   }
  }

}


function validatRegister(){
  let scheme = Joi.object({

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


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
      <h3 className="mb-5">Login Now</h3>
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

        <button type="submit" className="btn btn-primary">
         {isLoading === true ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
      </div>
    </>
  );
}
