import React from "react";
import { NavLink } from "react-router";
import { FaFacebook, FaLinkedin, FaGithub, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  const links = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/all-foods", label: "All Foods" },
        { to: "/gallery", label: "Gallery" },
        {
          to: "/about-us",
          label: "About Us",
          icon: <FaInfoCircle size={20} className="inline mr-1" />,
        },
        {
          to: "/contact",
          label: "Contact",
          icon: <FaPhoneAlt size={20} className="inline mr-1" />,
        },
      ].map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded font-semibold transition-colors duration-200 ${
                isActive
                  ? "bg-yellow-400 text-black dark:bg-yellow-300 dark:text-gray-900"
                  : "text-yellow-500 hover:bg-yellow-300 hover:text-black dark:hover:bg-yellow-400 dark:hover:text-gray-900"
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <footer className="bg-base-200 text-base-content ">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-yellow-400 dark:bg-yellow-300 p-2 rounded-xl">
              <img
                src="https://i.postimg.cc/3NbX17Vz/logo-restaurant.png"
                className="w-40 rounded-xl"
                alt="Logo"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-extrabold text-yellow-500 dark:text-yellow-400 mb-2">
              Important Links
            </h2>
            <ul className="space-y-2 text-center md:text-left">{links}</ul>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-extrabold text-yellow-500 dark:text-yellow-400 mb-2">
              Connect With Us
            </h2>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/AzijulHakimOfficiaL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook
                  className="text-blue-600 hover:text-blue-500 transition"
                  size={30}
                />
              </a>

              <a
                href="https://www.linkedin.com/in/azijulhakimbd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin
                  className="text-blue-500 hover:text-blue-400 transition"
                  size={30}
                />
              </a>

              <a
                href="https://github.com/azijulhakimbd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="  text-black transition" size={30} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mt-10 mb-4 dark:before:bg-gray-600 dark:after:bg-gray-600"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-3">
          <p className="text-center md:text-left">© 2025 All rights reserved</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline dark:hover:text-yellow-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline dark:hover:text-yellow-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
