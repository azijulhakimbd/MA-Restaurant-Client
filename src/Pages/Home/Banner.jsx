import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const images = [
  "https://i.postimg.cc/hPxTkG4s/tim-toomey-STq-HLq-Mne3k-unsplash.jpg",
  "https://i.postimg.cc/NFn9WWSW/graphe-tween-w0pj-GPm-GSiw-unsplash.jpg",
  "https://i.postimg.cc/Rh2hPwnm/vinn-koonyosying-v-BOxs-Zrfi-Cw-unsplash.jpg",
  "https://i.postimg.cc/nr9cQMSP/alexandru-bogdan-ghita-Ue-Ykq-Qh4-Po-I-unsplash.jpg",
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreFoods = () => {
    navigate("/all-foods");
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background image fade animation */}
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Text content animations */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-yellow-400 px-4 max-w-2xl"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow"
          >
            <Typewriter
              cursor
              cursorBlinking
              delaySpeed={1000}
              deleteSpeed={25}
              loop={0}
              typeSpeed={75}
              words={["Welcome to MA Restaurant", "Discover Delicious Foods"]}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl mb-6 text-white drop-shadow-md"
          >
            Explore a wide variety of cuisines made with love and premium
            ingredients. Taste the tradition!
          </motion.p>

          <motion.button
            onClick={handleExploreFoods}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 transition duration-300 rounded-md font-semibold text-gray-900 text-sm sm:text-base"
          >
            Explore All Foods
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
