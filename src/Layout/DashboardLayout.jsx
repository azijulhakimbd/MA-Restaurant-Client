import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiUser,
  FiShoppingBag,
  FiList,
  FiPlusSquare,
  FiX,
  FiMenu,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dark mode state: localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const menuItems = [
    {
      name: "Home",
      icon: <FiHome />,
      link: "/dashboard",
      color: "text-yellow-500",
    },
    {
      name: "Add Food",
      icon: <FiPlusSquare />,
      link: "/dashboard/add-food",
      color: "text-green-500",
    },
    {
      name: "My Foods",
      icon: <FiList />,
      link: "/dashboard/my-foods",
      color: "text-blue-500",
    },
    {
      name: "My Orders",
      icon: <FiShoppingBag />,
      link: "/dashboard/my-orders",
      color: "text-purple-500",
    },
    {
      name: "Profile",
      icon: <FiUser />,
      link: "/dashboard/profile",
      color: "text-pink-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-base-200 text-base-content transition-colors duration-300 ">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col w-64 bg-base-300 shadow-lg ">
        <div className="p-6 text-2xl font-bold text-primary border-b border-base-100 ">
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
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className={`flex font-extrabold text-2xl items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition ${item.color}`}
            >
              {React.cloneElement(item.icon, { className: item.color })}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-base-300 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden shadow-lg z-50 dark:bg-gray-800`}
      >
        <div className="p-6 text-2xl font-bold text-primary border-b border-base-100 flex justify-between items-center ">
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
          <FiX
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer text-2xl"
          />
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition ${item.color}`}
            >
              {React.cloneElement(item.icon, { className: item.color })}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-base-100 p-4 shadow-md md:hidden ">
          <FiMenu
            onClick={() => setSidebarOpen(true)}
            className="text-2xl cursor-pointer"
          />

          {/* Theme toggle and profile icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className="text-xl focus:outline-none"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            <Link to="/dashboard/profile" className="text-xl">
              <FiUser />
            </Link>
          </div>
        </header>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-end p-4 bg-base-100 shadow-md ">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Theme"
            className="mr-6 text-2xl focus:outline-none"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          <Link
            to="/dashboard/profile"
            className="text-2xl hover:text-primary transition"
            aria-label="Go to Profile"
          >
            <FiUser />
          </Link>
        </div>

        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
