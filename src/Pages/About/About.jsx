import React from "react";
import { FaUtensils, FaMobileAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

const About = () => {
  return (
    <section className="min-h-screen px-4 py-12 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-2">
            About MA Restaurant
          </h1>
          <p className="text-lg text-base-content/70">
            Your digital destination for delicious food and seamless restaurant management
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-10 text-lg leading-relaxed text-base-content/80">
          <p className="mb-4">
            <strong>MA Restaurant</strong> is a modern, full-stack restaurant platform that allows food lovers to explore, order, and enjoy their favorite dishes online—while giving restaurant owners powerful tools to manage food listings, orders, and inventory with ease.
          </p>
          <p className="mb-4">
            Built using the MERN stack (MongoDB, Express, React, Node.js), this application ensures smooth, secure, and scalable experiences for both customers and admins. With features like role-based dashboards, JWT authentication, real-time food availability, and an interactive image gallery—MA Restaurant is more than just an online menu; it’s a complete food management solution.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-success">
              <FaUtensils /> For Customers
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-base-content/80">
              <li>Browse a wide variety of delicious meals</li>
              <li>Search and filter food by name or category</li>
              <li>Place secure orders and view order history</li>
              <li>Lightbox gallery to explore food visually</li>
              <li>Responsive design for all devices</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-error">
              <MdRestaurantMenu /> For Restaurant Owners
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-base-content/80">
              <li>Add, update, and delete food listings</li>
              <li>Track and manage customer orders</li>
              <li>See real-time stock and food quantities</li>
              <li>JWT & Firebase-based protected admin routes</li>
              <li>Role-based access control (Admin vs User)</li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-info">
            <FaMobileAlt /> Key Features
          </h2>
          <ul className="grid md:grid-cols-2 gap-4 list-disc ml-6 text-base-content/80">
            <li>JWT-protected private routes</li>
            <li>Google & email/password login with Firebase</li>
            <li>Prevent buying your own listed food</li>
            <li>Out-of-stock restriction for food items</li>
            <li>Order history with formatted timestamps</li>
            <li>Theme toggle (light/dark mode)</li>
            <li>Toast and SweetAlert2 for better UX</li>
            <li>Framer Motion animations for smooth transitions</li>
          </ul>
        </div>

        {/* Closing */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-success mb-2">
            Powered by the MERN stack with ❤️
          </h3>
          <p className="text-base-content/60">
            Securely deployed on Firebase and Netlify for performance and scalability
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
