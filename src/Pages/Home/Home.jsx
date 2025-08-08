import React from "react";
import Banner from "./Banner";
import TopFoods from "./TopFoods";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import UpcomingEvent from "./UpcomingEvent";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopFoods></TopFoods>
      <WhyChooseUs></WhyChooseUs>
      <UpcomingEvent></UpcomingEvent>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
