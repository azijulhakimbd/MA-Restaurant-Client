import React from "react";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to "dark"
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Save theme to localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className="btn border rounded-full text-yellow-300"
      onClick={toggleTheme}
    >
      {theme === "light" ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
    </button>
  );
};

export default ThemeToggle;
