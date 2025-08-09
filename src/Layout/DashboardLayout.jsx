import React, { useState } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiSettings } from "react-icons/fi";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <FiHome />, link: "/dashboard" },
    { name: "Profile", icon: <FiUser />, link: "/dashboard/profile" },
    { name: "Settings", icon: <FiSettings />, link: "/dashboard/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col w-64 bg-base-300 shadow-lg">
        <div className="p-6 text-2xl font-bold text-primary border-b border-base-100">
          My Dashboard
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-base-300 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden shadow-lg z-50`}
      >
        <div className="p-6 text-2xl font-bold text-primary border-b border-base-100 flex justify-between items-center">
          My Dashboard
          <FiX
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer text-2xl"
          />
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-base-100 p-4 shadow-md md:hidden">
          <FiMenu
            onClick={() => setSidebarOpen(true)}
            className="text-2xl cursor-pointer"
          />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
