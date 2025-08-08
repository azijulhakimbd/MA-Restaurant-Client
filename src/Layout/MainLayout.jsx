import React from "react";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";

const MainLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      {/* Home Section */}
      <Home></Home>
      {/* contact */}
     <Contact></Contact>
    </div>
  );
};

export default MainLayout;
