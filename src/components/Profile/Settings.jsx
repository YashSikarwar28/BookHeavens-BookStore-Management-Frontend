import axios from "axios";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [value, setvalue] = useState({ address: "" });
  const [Profiledata, setProfiledata] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setvalue({ ...value, [name]: value });
  };

  const submitAddress = async () => {
    const response = await axios.put(
      "https://bookstore-backend-hjlm.onrender.com/api/v1/update-address",
      value,
      { headers }
    );
    alert(response.data.message)
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-backend-hjlm.onrender.com/api/v1/get-user-info",
        { headers }
      );
      setProfiledata(response.data);
      setvalue({ address: response.data.address });
    };

    fetch();
  }, []);

  return (
    <>
      {Profiledata && (
        <div className=" h-screen p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {Profiledata.username}
              </p>
            </div>

            <div>
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {Profiledata.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              onChange={change}
              placeholder="Address"
              value={value.address}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-zinc-500 text-shadow-zinc-900 font-semibold px-3 py-2 rounded hover:bg-zinc-800 cursor-pointer"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
