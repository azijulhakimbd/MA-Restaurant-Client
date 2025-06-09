import React from "react";
import Home from "../Pages/Home/Home";
import Reviews from "../Pages/Home/Review";
import NewsletterSubscribe from "../Pages/Home/NewsletterSubscribe";

const MainLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      {/* Home Section */}
      <Home></Home>
      {/* Newsletter Section*/}
      <NewsletterSubscribe></NewsletterSubscribe>
      {/* Reviews Section */}
      <Reviews></Reviews>
    </div>
  );
};

export default MainLayout;
