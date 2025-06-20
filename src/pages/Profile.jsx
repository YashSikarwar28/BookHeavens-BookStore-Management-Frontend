import React from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import {useSelector} from "react-redux"
import axios from "axios"
import {useEffect,useState} from "react"
import Mobilenav from "../components/Profile/Mobilenav";

const Profile = () => {

  //const isLoggedin = useSelector()
  const[profile,setprofile] = useState()
  
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }

  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("https://bookstore-backend-hjlm.onrender.com/api/v1/get-user-info",{headers})
      setprofile(response.data);
    }
    fetch()
  },[])

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      <div className="w-full md:w-1/6">
        <Sidebar data={profile} />
        <Mobilenav/>
      </div>
      <div className="w-full md:w-5/6">
        <Outlet/>
      </div>
    </div>
  );
};

export default Profile;
