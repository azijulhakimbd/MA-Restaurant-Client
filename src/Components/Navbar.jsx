import React, { use } from "react";
import { Link, NavLink } from "react-router";

import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const links = (
    <>
      <li>
        <NavLink
          className="text-yellow-500 border-double border mx-2 font-extrabold"
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-yellow-500 border-double border mx-2 font-extrabold"
          to={"/all-foods"}
        >
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-yellow-500 border-double border mx-2 font-extrabold"
          to={"Gallery"}
        >
          Gallery
        </NavLink>
      </li>
    </>
  );
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful!");
      })
      .catch((error) => {
        toast.error("Logout failed. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 text-yellow-500 border outline-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-4xl f1 text-green-500 font-extrabold">
          <img
            src="https://i.postimg.cc/3NbX17Vz/logo-restaurant.png"
            className="w-30 bg-yellow-300 rounded-3xl"
            alt="MA Restaurant"
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-yellow-400 px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle></ThemeToggle>

        {user ? (
          <>
            <UserProfile></UserProfile>
            <button onClick={handleLogout} className="btn bg-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn bg-yellow-300 text-black" to={"/login"}>
              Login
            </Link>
            <Link className="btn bg-yellow-300 text-black" to={"/register"}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
