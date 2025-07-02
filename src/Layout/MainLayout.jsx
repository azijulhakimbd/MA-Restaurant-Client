import React from "react";
import Home from "../Pages/Home/Home";
import NewsletterSubscribe from "../Pages/Home/NewsletterSubscribe";

const MainLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      {/* Home Section */}
      <Home></Home>
      {/* Newsletter Section*/}
      <NewsletterSubscribe></NewsletterSubscribe>
     
    </div>
  );
};

export default MainLayout;
