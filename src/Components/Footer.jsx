import React from "react";
import { NavLink } from "react-router";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
const Footer = () => {
  const links = (
    <>
      <li>
        <NavLink
          className="text-yellow-500 dark:text-yellow-400 hover:underline font-bold"
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-yellow-500 dark:text-yellow-400 hover:underline font-bold"
          to="/allfoods"
        >
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-yellow-500 dark:text-yellow-400 hover:underline font-bold"
          to="/gallery"
        >
          Gallery
        </NavLink>
      </li>
    </>
  );

  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="https://i.postimg.cc/3NbX17Vz/logo-restaurant.png"
              className="w-40 rounded-xl bg-yellow-400"
              alt="Logo"
            />
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
            <div className="flex">
              <a href="https://www.facebook.com/AzijulHakimOfficiaL">
                <FaFacebook className="text-blue-500 mx-1" size={30} />
              </a>

              <a href="https://www.linkedin.com/in/azijulhakimbd/">
                <FaLinkedin className="text-blue-500 mx-1" size={30} />
              </a>

              <a href="https://github.com/azijulhakimbd">
                <FaGithub className="text-black mx-1" size={30} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mt-10 mb-4"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-3">
          <p className="text-center md:text-left">© 2025 All rights reserved</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
