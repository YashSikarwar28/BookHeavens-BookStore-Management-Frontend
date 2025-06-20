import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBooksDetails = () => {
  const { id } = useParams(); //fetches the book id from the url
  const isLoggeddin = useSelector((state) => state.auth.isLoggedin);
  const role = useSelector((state) => state.auth.role);

  const [data, setdata] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-backend-hjlm.onrender.com/api/v1/get-book-by-id/${id}`
      );
      setdata(response.data.data);
    };
    fetch();
  }, []);

  //headers is required to get the output~refer backend code
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      "https://bookstore-backend-hjlm.onrender.com/api/v1/add-book-to-fav",
      {},
      { headers }
    );
    console.log(response);
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "https://bookstore-backend-hjlm.onrender.com/api/v1/add-to-cart",
      {},
      { headers }
    );
    console.log(response);
    alert(response.data.message);
  };

  return (
    <>
      {data && (
        <div className="px-8 md:flex-row flex-col flex py-12 bg-zinc-900 gap-8">
          <div className="bg-zinc-800 flex items-center justify-around lg:flex-row flex-col rounded p-4 h-[60vh] md:h-[80vh] lg:w-3/6">
            <img className="lg:h-[70vh] rounded-xl h-[50vh]" src={data?.url} />

            {isLoggeddin === true && role === "user" && (
              <div className="flex mt-4 md:gap-2 gap-10 flex-row lg:flex-col lg:mt-[-312px] lg:gap-4">
                <button
                  className="rounded-full mt-3 cursor-pointer bg-white text-3xl p-3 text-red-500"
                  onClick={handleFavourite}
                >
                  <FaHeart />
                </button>
                <button
                  className="rounded-full mt-3 cursor-pointer text-4xl bg-white text-blue-500 p-2"
                  onClick={handleCart}
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}

            {isLoggeddin === true && role === "admin" && (
              <div className="flex mt-4 md:gap-2 gap-10 flex-row lg:flex-col lg:mt-[-312px] lg:gap-4">
                <button className="rounded-full mt-3 cursor-pointer text-4xl bg-white text-blue-500 p-2">
                  <FaEdit />
                </button>
                <button className="rounded-full mt-3 cursor-pointer text-4xl bg-white text-blue-500 p-2">
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
          <div className="p-4 lg:w-3/6">
            <h1 className="text-yellow-100 text-4xl font-semibold">
              {data?.title}
            </h1>
            <p className="text-zinc-200 text-xl py-2 px-2">{data?.author}</p>
            <p className="text-zinc-400 my-5 text-xl">{data?.description}</p>
            <p className="text-white text-xl">{data?.language}</p>
            <p className="text-zinc-300 my-2 text-xl">Price :₹{data?.price}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBooksDetails;
