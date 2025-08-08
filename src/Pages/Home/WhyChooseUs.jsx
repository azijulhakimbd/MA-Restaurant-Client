import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { FaLeaf, FaClock, FaSmile } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Food from "../../assets/Lottie/Food.json";

const features = [
  {
    icon: <FaLeaf className="text-4xl text-success mb-2 mx-auto" />,
    title: "Fresh Ingredients",
    description:
      "We use only the freshest, locally sourced ingredients for every meal.",
  },
  {
    icon: <FaClock className="text-4xl text-warning mb-2 mx-auto" />,
    title: "Quick Delivery",
    description:
      "Enjoy your food at lightning speed—delivered hot and fresh to your door.",
  },
  {
    icon: <FaSmile className="text-4xl text-info mb-2 mx-auto" />,
    title: "Customer Satisfaction",
    description: "Your happiness is our priority—always!",
  },
];

const WhyChooseUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
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
    <section className="bg-base-100 text-base-content py-12 px-6">
      {/* Animation at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-32 mb-4 mx-auto"
      >
        <Lottie animationData={Food} loop={true} />
      </motion.div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
        <Typewriter
          cursor
          cursorBlinking
          delaySpeed={1000}
          deleteSpeed={25}
          loop={0}
          typeSpeed={75}
          words={["Why Choose Us"]}
        />
      </h2>

      {/* Cards */}
      <SkeletonTheme baseColor="#d9d9d9" highlightColor="#ecebeb">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-base-200 shadow flex flex-col items-center"
              >
                <Skeleton circle height={50} width={50} className="mb-3" />
                <Skeleton width={120} height={20} className="mb-2" />
                <Skeleton count={2} width={200} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-6 rounded-xl bg-base-200 shadow hover:shadow-lg"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </SkeletonTheme>
    </section>
  );
};

export default WhyChooseUs;
