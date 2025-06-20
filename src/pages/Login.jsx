import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

const Login = () => {

  const [values, setvalues] = useState({
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const  navigate = useNavigate()

  const dispatch = useDispatch() //used for changing the state from user to admin and vice versa

  const submit = async () => {
    console.log("Clicked")
    try {
      if (
        values.username === "" ||
        values.password === "" 
      ) {
        alert("All fields are required");
      }
      else{
        const response = await axios.post("https://bookstore-backend-hjlm.onrender.com/api/v1/signin",values)
        
        console.log(response.data)

        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        localStorage.setItem("id",response.data.id)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.role)
        
        navigate("/profile")
      
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-8 py-56 md:py-18 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">LogIn</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              value={values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-blue-400 text-white font-semibold py-2 rounded cursor-pointer hover:bg-blue-700" onClick={submit}>
              LogIn
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/SignUp" className="hover:text-blue-500 cursor-pointer">
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login