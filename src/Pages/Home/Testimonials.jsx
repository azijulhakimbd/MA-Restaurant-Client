import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import reviewAnimation from "../../assets/Lottie/Reviews.json";

const detailedReviews = [
  {
    name: "Sophia Turner",
    image: "https://i.pravatar.cc/150?img=1",
    text: "Amazing food, lovely ambiance, and great service. I will definitely come back!",
    rating: 5,
  },
  {
    name: "James Smith",
    image: "https://i.pravatar.cc/150?img=2",
    text: "The pasta was perfectly cooked and the flavors were authentic. Highly recommend!",
    rating: 4,
  },
  {
    name: "Luna Wilson",
    image: "https://i.pravatar.cc/150?img=3",
    text: "A cozy place with a diverse menu. Desserts were out of this world.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-base-100 text-base-content py-12 px-4 max-w-7xl mx-auto">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="w-32 mb-4">
          <Lottie animationData={reviewAnimation} loop={true} />
        </div>
        <h2 className="text-4xl font-bold text-yellow-500 text-center">
         What Our Customers Say
        </h2>
      </motion.div>

      {/* Reviews */}
      <SkeletonTheme baseColor="#d9d9d9" highlightColor="#ecebeb">
        {loading ? (
          // Skeleton Loading State
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="card shadow-lg bg-base-100 p-6 rounded-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton circle height={56} width={56} />
                  <div>
                    <Skeleton width={120} height={18} />
                    <Skeleton width={80} height={15} />
                  </div>
                </div>
                <Skeleton count={3} />
              </div>
            ))}
          </div>
        ) : (
          // Animated Reviews
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12"
          >
            {detailedReviews.map((review, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="card shadow-lg bg-base-100 p-6 rounded-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-14 h-14 rounded-full border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <div className="flex text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-lg">{review.text}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </SkeletonTheme>
    </section>
  );
};

export default Testimonials;
