import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex md:flex-row flex-col ">
      <div className="w-full lg:w-3/6 flex flex-col my-12 items-center justify-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 ">
          Your Gateway to Great Reads
        </h1>
        <p className="lg:text-left text-center my-4 text-xl text-zinc-300">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books
        </p>
        <div className="mt-6">
          <Link to="/all-books" className="text-yellow-100 text-xl border cursor-pointer border-yellow-100 lg:text-2xl rounded-full hover:bg-zinc-700 text-center py-2 px-10">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lh:h-[100%] flex items-center justify-center">
        <img  src="./hero.png" alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
