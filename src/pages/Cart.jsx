import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setcart] = useState();
  const [total, settotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://bookstore-backend-hjlm.onrender.com/api/v1/get-user-cart",
        { headers }
      );
      setcart(res.data.data);
    };
    fetch();
  }, [cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `https://bookstore-backend-hjlm.onrender.com/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  //for calculating the price of book available in cart
  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      {
        cart.map((item) => (total += item.price));
      }
      settotal(total);
      total = 0;
    }
  }, [cart]);

  const placeOrder = async () => {
    const response = await axios.post(
      "https://bookstore-backend-hjlm.onrender.com/api/v1/place-order",
      { order: cart },
      { headers }
    );
    alert(response.data.message);
    const res = await axios.get("https://bookstore-backend-hjlm.onrender.com/api/v1/get-user-cart", {
      headers,
    });
    setcart(res.data.data);
    navigate("/profile/orderHistory");
  };

  return (
    <div className="bg-zinc-900 px-12 h-screen py-4">
      {!cart && <Loader />}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-3xl lg:text-5xl font-semibold text-zinc-500">
              Empty Cart
            </h1>
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-4xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>

          {cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={item.url}
                className="h-[20vh] md:h-[30vh] object-cover"
                alt=""
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.description.slice(0, 100)}
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {item.description.slice(0, 65)}
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {item.description.slice(0, 100)}
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹{item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-800 border cursor-pointer font-semibold border-red-500 rounded p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} Books</h2>
              <h2>₹{total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded  px-4 py-2 flex justify-center w-full font-semibold cursor-pointer hover:bg-zinc-500 transition-all duration-150"
                onClick={placeOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
