import React, { useEffect, useState } from "react";
import axios from "axios";
import Bookcard from "../Bookcard/Bookcard";

const Favourites = () => {
  const [favouriteBooks, setfavouriteBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-backend-hjlm.onrender.com/api/v1/get-fav-books",
        { headers }
      );
      setfavouriteBooks(response.data.data);
    };
    fetch();
  }, [favouriteBooks]);

  return (
    <>
      <div className="grid  grid-cols-4 gap-5">
        {favouriteBooks?.length === 0 && 
          <div className="text-2xl font-semibold text-zinc-500">
            No Favourite Book Added
          </div>
        }
      
        <div className="grid grid-cols-1 w-[300px]  md:w-[800px] md:gap-20 mx-12 md:grid-cols-4">

        {favouriteBooks &&
          favouriteBooks.map((item, i) => (
            <div key={i}>
              <Bookcard data={item} favourite={true} />
            </div>
          ))}
          </div>
          </div>
    
    </>
  );
};

export default Favourites;
