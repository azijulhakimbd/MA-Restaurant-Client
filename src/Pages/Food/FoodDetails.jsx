import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Simple skeleton loader component
const Skeleton = () => (
  <div className="min-h-screen mx-auto px-4 md:px-20 py-10 flex items-center justify-center bg-base-200">
    <div className="animate-pulse w-full lg:flex lg:gap-6">
      {/* Image Skeleton */}
      <div className="bg-gray-300 h-64 lg:h-[400px] w-full lg:w-1/2 rounded-lg"></div>
      {/* Text Skeleton */}
      <div className="flex-1 space-y-4 mt-6 lg:mt-0">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
        <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
        <div className="bg-gray-300 h-8 w-1/4 rounded"></div>
        <div className="bg-gray-300 h-16 w-full rounded"></div>
        <div className="bg-gray-300 h-10 w-32 rounded"></div>
      </div>
    </div>
  </div>
);

const FoodDetails = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);

  const {
    _id,
    name,
    image,
    category,
    origin,
    quantity,
    price,
    description,
    purchaseCount,
  } = data || {};

  useEffect(() => {
    // Simulate loading time (optional)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="min-h-screen mx-auto px-4 md:px-20 flex items-center justify-center bg-base-200 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card w-full bg-base-100 shadow-xl flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Image Section */}
        <motion.figure
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-64 lg:h-full object-cover"
          />
        </motion.figure>

        {/* Details Section */}
        <div className="card-body w-full lg:w-1/2 space-y-3">
          <motion.h2
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="card-title text-yellow-500 text-2xl md:text-3xl font-bold"
          >
            {name}
          </motion.h2>

          <p className="text-base md:text-lg">
            Category: <span className="font-medium">{category}</span>
          </p>
          <p className="text-base md:text-lg">
            Origin: <span className="font-medium">{origin}</span>
          </p>
          <p className="text-base md:text-lg">
            Available Quantity: <span className="font-medium">{quantity}</span>
          </p>
          <p className="text-green-600 font-bold text-lg md:text-xl">
            Price: ${price}
          </p>
          <p className="text-base md:text-lg">{description}</p>
          <p className="text-base md:text-lg">
            Purchase Count:{" "}
            <span className="font-bold text-success">{purchaseCount || 0}</span>
          </p>

          {/* Purchase Button */}
          <div className="card-actions mt-4">
            <Link
              to={`/dashboard/food-purchase/${_id}`}
              className="w-full md:w-auto"
            >
              <motion.button
                whileHover={{ scale: quantity === 0 ? 1 : 1.05 }}
                whileTap={{ scale: quantity === 0 ? 1 : 0.95 }}
                disabled={quantity === 0}
                className={`btn w-full bg-yellow-500 md:w-auto ${
                  quantity === 0 ? "btn-disabled" : "btn-yellow"
                }`}
              >
                {quantity === 0 ? "Out of Stock" : "Purchase"}
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodDetails;
