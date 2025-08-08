import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://restaurant-management-server-psi.vercel.app/topFoods")
      .then((res) => {
        setTopFoods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch top foods", err);
        setLoading(false);
      });
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 text-yellow-500"
      >
        🍽️ Top Selling Foods
      </motion.h2>

      {/* Skeleton Theme Wrapper */}
      <SkeletonTheme baseColor="#d9d9d9" highlightColor="#ecebeb">
        {loading ? (
          // Skeleton Grid (4 per row on large screens)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="card bg-base-200 shadow-md rounded-lg overflow-hidden"
              >
                <Skeleton height={250} />
                <div className="card-body">
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="50%" />
                  <Skeleton width="40%" />
                  <Skeleton width={80} height={30} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Animated Cards Grid
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {topFoods.map((food) => (
              <motion.div
                key={food._id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="card bg-base-200 shadow-md hover:shadow-lg transition duration-300"
              >
                <figure>
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-64 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-yellow-500">{food.name}</h3>
                  <p>
                    <span className="font-semibold">Origin:</span> {food.origin}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> ${food.price}
                  </p>
                  <p>
                    <span className="font-semibold text-success">Sold:</span>{" "}
                    {food.purchaseCount || 0} times
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/foods/${food._id}`}>
                      <button className="btn bg-yellow-500 btn-sm">
                        Food Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </SkeletonTheme>

      {/* See All Button */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/all-foods")}
            className="btn btn-outline bg-yellow-500"
          >
            See All Foods
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TopFoods;
