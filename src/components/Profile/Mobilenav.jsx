import React from "react";
import { Link } from "react-router-dom";

const Mobilenav = () => {
  return (
    <div className="lg:hidden w-full flex mt-6 items-center justify-center">
      <Link
        to="/profile"
        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-600 rounded transition-all duration-200"
      >
        Favourites
      </Link>
      <Link
        to="/profile/orderHistory"
        className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-600 rounded transition-all duration-200"
      >
        Order History
      </Link>
      <Link
        to="/profile/settings"
        className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-600 rounded transition-all duration-200"
      >
        Settings
      </Link>
    </div>
  );
};

export default Mobilenav;
