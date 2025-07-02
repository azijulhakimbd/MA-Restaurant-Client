import React from "react";
import { FaLeaf, FaClock, FaSmile } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="bg-base-100 text-base-content py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">Why Choose Us</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
        <div className="p-6 rounded-xl bg-base-200 shadow">
          <FaLeaf className="text-4xl text-success mb-2 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
          <p>We use only the freshest, locally sourced ingredients for every meal.</p>
        </div>
        <div className="p-6 rounded-xl bg-base-200 shadow">
          <FaClock className="text-4xl text-warning mb-2 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Quick Delivery</h3>
          <p>Enjoy your food at lightning speed—delivered hot and fresh to your door.</p>
        </div>
        <div className="p-6 rounded-xl bg-base-200 shadow">
          <FaSmile className="text-4xl text-info mb-2 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
          <p>Your happiness is our priority—always!</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
