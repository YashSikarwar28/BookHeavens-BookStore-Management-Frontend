import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Bookcard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleremovebook = async () => {
    const response = await axios.put(
      "https://bookstore-backend-hjlm.onrender.com/api/v1/remove-book-from-fav",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-zinc-800 rounded-2xl p-3 my-4 flex flex-col ">
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="bg-zinc-900 flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[35vh]" />
          </div>
          <h2 className="mt-4 text-[20px] text-zinc-200 font-semibold">
            {data.title}
          </h2>
          <p className=" mt-1 text-[16px] text-zinc-400 font-semibold">
            {data.author}
          </p>
          <p className=" text-zinc-200 text-[16px] mt-1">₹{data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-zinc-700 text-red-500 font-semibold px-4 py-2 rounded mt-4 hover:text-white hover:bg-red-500 transition-all text-sm duration-200 cursor-pointer"
          onClick={handleremovebook}
        >
          Remove from Favourite
        </button>
      )}
    </div>
  );
};

export default Bookcard;
