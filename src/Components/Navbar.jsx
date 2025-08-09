import React, { useContext } from "react";
import { Link, NavLink } from "react-router"; 
import {
  FaHome,
  FaUtensils,
  FaImages,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = [
    { to: "/", label: "Home", icon: <FaHome size={20} className="inline mr-1" /> },
    { to: "/all-foods", label: "All Foods", icon: <FaUtensils size={20} className="inline mr-1" /> },
    { to: "/gallery", label: "Gallery", icon: <FaImages size={20} className="inline mr-1" /> },
    { to: "/about-us", label: "About Us", icon: <FaInfoCircle size={20} className="inline mr-1" /> },
    { to: "/contact", label: "Contact", icon: <FaPhoneAlt size={20} className="inline mr-1" /> },
  ];

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
    <div className="navbar px-15 sticky top-0 z-50 bg-base-100/70 backdrop-blur-md shadow-sm">
      <div className="navbar-start">
        {/* Mobile dropdown toggle */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded font-semibold ${
                      isActive
                        ? "bg-yellow-400 text-black"
                        : "hover:bg-yellow-300 hover:text-black"
                    }`
                  }
                >
                  {icon} {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost normal-case lg:text-3xl font-extrabold text-green-500"
        >
          <img
            src="https://i.postimg.cc/3NbX17Vz/logo-restaurant.png"
            className="w-20 lg:w-28 rounded-2xl lg:rounded-3xl bg-yellow-300"
            alt="MA Restaurant"
          />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded font-semibold ${
                    isActive
                      ? "bg-yellow-400 text-black"
                      : "text-yellow-500 hover:bg-yellow-300 hover:text-black"
                  }`
                }
              >
                {icon} {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side */}
      <div className="navbar-end space-x-2">
        <ThemeToggle />
        {user ? (
          <>
            <UserProfile />
            <button
              onClick={handleLogout}
              className="btn bg-red-400 hover:bg-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="btn bg-yellow-300 text-black hover:bg-yellow-400"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn bg-yellow-300 text-black hover:bg-yellow-400"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
