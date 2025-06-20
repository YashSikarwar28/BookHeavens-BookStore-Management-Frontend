import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserOrderrHistory = () => {
  const [orderHistory, setorderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.post(
        "https://bookstore-backend-hjlm.onrender.com/api/v1/get-order-history",
        {},
        { headers }
      );
      setorderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
          </div>
        </div>
      )}

      {orderHistory && orderHistory.length > 0 && (
        <div className="md:h-[25%] h-[14%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] md:block hidden">
              <h1 className="text-center ">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[39%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[16%] md:block hidden">
              <h1 className="text-center ">Price</h1>
            </div>
            <div className="w-[16%] md:mx-0 mx-[30px]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1>Mode</h1>
            </div>
          </div>
        </div>
      )}

      {orderHistory &&
        orderHistory.map((item, i) => (
          <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 cursor-pointer">
            <div className="w-[3%] md:block hidden">
              <h1 className="text-center ">{i + 1}</h1>
            </div>
            <div className="w-[22%]">
              <Link
                className="hover:text-blue-300"
                to={`/view-book-details/${item.book._id}`}
              >
                {item.book.title}
              </Link>
            </div>
            <div className="w-[45%]">
              <h1>{item.book.description.slice(0, 50)}</h1>
            </div>
            <div className="w-[9%] md:block">
              <h1 className="md:block hidden">{item.book.price}</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="font-semibold md:mx-0 mx-[-50px] text-green-500">
                
                {item.status === "Order Placed" ? (
                  <div className="text-yellow-500">{item.status}</div>
                ) : item.status === "Cancelled" ? (
                  <div className="text-red-500">{item.status}</div>
                ) : (
                  item.status
                )}
              
              </h1>
            </div>

            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="text-sm text-zinc-400">COD</h1>
            </div>
          </div>
        ))}
    </>
  );
};

export default UserOrderrHistory;
