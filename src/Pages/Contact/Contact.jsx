import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-6 py-12 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {loading ? (
            <>
              <Skeleton height={48} width={300} className="mx-auto mb-2" />
              <Skeleton height={20} width={280} className="mx-auto" />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-extrabold text-yellow-500 mb-2">
                Contact MA Restaurant
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-300">
                We’re here to help. Reach out to us anytime!
              </p>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {loading ? (
              <>
                <Skeleton height={40} width={280} />
                <Skeleton height={40} width={280} />
                <Skeleton height={40} width={280} />
                <Skeleton height={32} width={200} className="mt-4" />
              </>
            ) : (
              <>
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <FaMapMarkerAlt className="text-2xl text-green-500" />
                  <div>
                    <h4 className="font-bold">Address</h4>
                    <p>Nalitabari, Sherpur.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaPhoneAlt className="text-2xl text-green-500" />
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>+880 1758-524125</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaEnvelope className="text-2xl text-green-500" />
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p>info@ma-restaurant.com</p>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="flex gap-6 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <a
                    href="https://facebook.com/azijulhakimbd"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:scale-110 transition"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://twitter.com/azijulhakimbd"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-500 hover:scale-110 transition"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href="https://instagram.com/azijulhakimbd"
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-500 hover:scale-110 transition"
                  >
                    <FaInstagram size={24} />
                  </a>
                </motion.div>
              </>
            )}
          </div>

          {/* Contact Form */}
          <div>
            {loading ? (
              <>
                <Skeleton height={40} className="mb-4 rounded" />
                <Skeleton height={40} className="mb-4 rounded" />
                <Skeleton height={96} className="mb-6 rounded" />
                <Skeleton height={48} width="100%" className="rounded" />
              </>
            ) : (
              <motion.form
                className="space-y-6 bg-base-200 p-6 rounded-xl shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
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

                <button
                  type="submit"
                  className="btn bg-yellow-400 text-black hover:bg-yellow-500 w-full"
                >
                  Send Message
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
