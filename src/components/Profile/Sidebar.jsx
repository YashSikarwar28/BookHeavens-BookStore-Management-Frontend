import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {authActions} from "../../store/auth"

const Sidebar = ({ data }) => {
  const dispatch = useDispatch()
  const history = useNavigate()

  return (
    <div className="bg-zinc-800 p-4 rounded flex justify-center items-center flex-col">
      <img src={data?.avatar} className="rounded h-[8vh]" alt="" />
      <p className="font-semibold text-xl mt-3 text-zinc-300">
        {data?.username}
      </p>
      <p className="text-zinc-200 ">{data?.email}</p>
      <div className="w-full mt-4 h-[4px] hidden lg:block bg-zinc-500"></div>

      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 mt-3 text-center hover:bg-zinc-600 rounded transition-all duration-200">
        Favourites 
        </Link>
        <Link to="/profile/orderHistory" className="text-zinc-100 mt-3 font-semibold w-full py-2 text-center hover:bg-zinc-600 rounded transition-all duration-200">
        Order History
        </Link>
        <Link to="/profile/settings" className="text-zinc-100 font-semibold mt-3 w-full py-2 text-center hover:bg-zinc-600 rounded transition-all duration-200">
        Settings
        </Link>
      </div>

      <button className="mt-3 bg-zinc-900 p-3 rounded font-semibold w-3/6 lg:w-full cursor-pointer hover:bg-zinc-800 duration-200"
      onClick={()=>{
        dispatch(authActions.logout())
        dispatch(authActions.changeRole("user"))
        localStorage.clear("id")
        localStorage.clear("token")
        localStorage.clear("role")
        history("/")
      }}
      >Log Out</button>
   
    </div>
  );
};

export default Sidebar;
