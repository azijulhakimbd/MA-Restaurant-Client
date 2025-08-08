import React from "react";
import Banner from "./Banner";
import TopFoods from "./TopFoods";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import UpcomingEvent from "./UpcomingEvent";
import FoodFeature from "./FoodFeature";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopFoods></TopFoods>
      <UpcomingEvent></UpcomingEvent>
      <WhyChooseUs></WhyChooseUs>
      <FoodFeature></FoodFeature>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
