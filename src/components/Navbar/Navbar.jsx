import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const [mobnav, setmobnav] = useState("hidden");

  const isLoggeddin = useSelector((state) => state.auth.isLoggedin);
  const role = useSelector((state)=>state.auth.role)

  console.log(role);
  
  if (isLoggeddin == false) {
    links.splice(2, 2);
  }

  return (
    <>
      <nav className="bg-zinc-800 relative text-white flex items-center z-50 justify-between px-8 py-4">
        <div>
          <Link to="/ " className="text-2xl cursor-pointer font-semibold">
            BookHeaven
          </Link>
        </div>
        <div className="nav-links-bookheaven block md:flex items-center gap-4 cursor-pointer">
          <div className="hidden md:flex gap-6">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className="hover:text-pink-500 transition-all duration-300"
                key={i}
              >
                {items.title}
              </Link>
            ))}
          </div>

          {isLoggeddin === false && (
            <>
              <div className="hidden md:flex gap-6">
                <Link
                  to="/LogIn"
                  className=" cursor-pointer border px-3 py-1 border-pink-500  hover:text-pink-500 transition-all duration-200 rounded"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="bg-blue-500 hover:bg-zinc-800 hover:text-blue-500 transition-all duration-200 px-3 cursor-pointer py-1 rounded"
                >
                  SignUp
                </Link>
              </div>
            </>
          )}

          <button
            className="text-white text-xl flex cursor-pointer hover:text-zinc-300 md:hidden"
            onClick={() =>
              mobnav === "hidden" ? setmobnav("block") : setmobnav("hidden")
            }
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>
      <div
        className={`  ${mobnav}  bg-zinc-800 absolute top-0 left-0 w-full my-16 py-5 z-40 flex flex-col text-white items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={` ${mobnav}  hover:text-pink-500 transition-all duration-300 text-2xl my-2.5`}
            key={i}
            onClick={() =>
              mobnav === "hidden" ? setmobnav("block") : setmobnav("hidden")
            }
          >
            {items.title}
          </Link>
        ))}

        {isLoggeddin === false && (
          <>
            <Link
              to="/LogIn"
              className={` ${mobnav}  text-xl cursor-pointer border px-3 my-2.5 py-1 border-pink-500  hover:text-pink-500 transition-all duration-200 rounded `}
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className={` ${mobnav}  bg-blue-500 hover:bg-zinc-800 hover:text-blue-500 my-3.5 transition-all duration-200 text-xl px-3 cursor-pointer py-1 rounded`}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
