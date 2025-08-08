import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import errorAnimation from "../assets/lottie/Error.json";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading 
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex h-screen items-center p-16 dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900 transition-colors duration-500">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <AnimatePresence>
            {loading ? (
              <>
                <Skeleton
                  height={288}
                  width={288}
                  className="mx-auto mb-6 rounded-lg"
                />
                <Skeleton height={112} width={160} className="mb-4 mx-auto" />
                <Skeleton height={32} width={280} className="mb-2 mx-auto" />
                <Skeleton height={20} width={240} className="mx-auto" />
                <Skeleton height={40} width={160} className="mt-6 mx-auto rounded" />
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Lottie
                  animationData={errorAnimation}
                  loop={true}
                  className="w-72 mx-auto mb-6"
                />
                <motion.h2
                  className="mb-8 font-extrabold text-9xl dark:text-gray-400"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="sr-only">Error</span>404
                </motion.h2>
                <motion.p
                  className="text-2xl font-semibold md:text-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Sorry, we couldn't find this page.
                </motion.p>
                <motion.p
                  className="mt-4 mb-8 dark:text-gray-400 text-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  But don’t worry, you can find plenty of other things on our
                  homepage.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Link
                    to="/"
                    className="px-8 btn py-3 font-semibold rounded dark:bg-yellow-500 dark:hover:bg-yellow-600 bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition"
                  >
                    Back to homepage
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
