import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader"
import Bookcard from "../components/Bookcard/Bookcard";
import axios from "axios";


const Allbooks = () => {

  const [data, setdata] = useState()

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-backend-hjlm.onrender.com/api/v1/get-all-books"
      );
      setdata(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-10 py-9">
      <div className="text-white font-semibold text-2xl">
        All Books
        {!data && (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        )}
        <div className="my-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {data &&
            data.map((item, i) => (
              <div key={i}>
                <Bookcard data={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Allbooks;
