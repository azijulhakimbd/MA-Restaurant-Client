import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="min-h-screen px-6 py-12 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-yellow-500 mb-2">
            Contact MA Restaurant
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300">
            We’re here to help. Reach out to us anytime!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-green-500" />
              <div>
                <h4 className="font-bold">Address</h4>
                <p>Nalitabari, Sherpur.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-2xl text-green-500" />
              <div>
                <h4 className="font-bold">Phone</h4>
                <p>+880 1758-524125</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-2xl text-green-500" />
              <div>
                <h4 className="font-bold">Email</h4>
                <p>info@ma-restaurant.com</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-4">
              <a href="https://facebook.com/azijulhakimbd" target="_blank" rel="noreferrer" className="text-blue-600 hover:scale-110 transition">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com/azijulhakimbd" target="_blank" rel="noreferrer" className="text-sky-500 hover:scale-110 transition">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com/azijulhakimbd" target="_blank" rel="noreferrer" className="text-pink-500 hover:scale-110 transition">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 bg-base-200 p-6 rounded-xl shadow">
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-semibold">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-semibold">
                Message
              </label>
              <textarea
                id="message"
                className="textarea textarea-bordered w-full h-32"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn bg-yellow-400 text-black hover:bg-yellow-500 w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
