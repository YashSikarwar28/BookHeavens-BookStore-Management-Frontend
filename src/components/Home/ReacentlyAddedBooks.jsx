import React, { useEffect, useState } from "react";
import axios from "axios";
import Bookcard from "../Bookcard/Bookcard";
import Loader from "../Loader/Loader";

const ReacentlyAddedBooks = () => {
  
  const [data, setdata] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-backend-hjlm.onrender.com/api/v1/get-recent-books"
      );
      //console.log(response.data.data);
      setdata(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-15 px-4 text-yellow-100 text-2xl ">
      Recently Added Books
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
  );
};

export default ReacentlyAddedBooks;
