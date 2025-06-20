import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const [values, setvalues] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const  navigate = useNavigate()

  const submit = async () => {
    console.log("Clicked")
    try {
      if (
        values.username === "" ||
        values.password === "" ||
        values.email === "" ||
        values.address === ""
      ) {
        alert("All fields are required");
      }
      else{
        const response = await axios.post("https://bookstore-backend-hjlm.onrender.com/api/v1/signup",values)
        
        alert(response.data.message)
        navigate("/LogIn")
      
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-8 md:py-12 py-18 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
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
              Email
            </label>
            <input
              type="text"
              name="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@gmail.com"
              required
              value={values.email}
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
            <label htmlFor="" className="text-zinc-400">
              Address
            </label>
            <textarea
              name="address"
              placeholder="address"
              rows="5"
              required
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              value={values.address}
              onChange={change}
            ></textarea>
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-blue-400 text-white font-semibold py-2 rounded cursor-pointer hover:bg-blue-700"
              onClick={submit}
            >
              SignUp
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/LogIn" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
