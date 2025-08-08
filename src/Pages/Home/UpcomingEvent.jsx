import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UpcomingEvent = () => {
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const [event, setEvent] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setEvent({
        title: "🌮 Taco Tuesday - 50% Off!",
        description: "Enjoy delicious tacos at half price until midnight!",
        images: [
          "https://i.postimg.cc/1zKg9gb0/divani-s0du-M7x1yu-A-unsplash.jpg",
          "https://i.postimg.cc/nr9cQMSP/alexandru-bogdan-ghita-Ue-Ykq-Qh4-Po-I-unsplash.jpg",
          "https://i.postimg.cc/mr4zf3p2/molly-keesling-M56xme21-M7-I-unsplash.jpg",
          "https://i.postimg.cc/c6q17ZV4/edward-franklin-Nb-Q-M3-Cdzg-unsplash.jpg",
        ],
        endTime: new Date().setHours(23, 59, 59, 999),
      });
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (!event) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = event.endTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ expired: true });
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  useEffect(() => {
    if (!event || loading) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % event.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [event, loading]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? event.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-12 px-4 bg-base-100 text-base-content transition-colors duration-500">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-yellow-500 sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎉 Upcoming Event
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center bg-base-200 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Image Slider */}
          <div className="relative w-full h-64 sm:h-72 md:h-96 overflow-hidden rounded-xl">
            {loading ? (
              <Skeleton height="100%" baseColor="#d1d5db" highlightColor="#f3f4f6" />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={event.images[currentImage]}
                    src={event.images[currentImage]}
                    alt={event.title}
                    className="w-full h-full object-cover select-none"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Nav Arrows */}
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Text Section */}
          <div>
            {loading ? (
              <>
                <Skeleton height={30} width="70%" className="mb-4" />
                <Skeleton count={3} />
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2 sm:text-3xl">{event.title}</h3>
                <p className="mb-4 text-base sm:text-lg">{event.description}</p>

                {!timeLeft.expired ? (
                  <div className="flex gap-4 text-center text-yellow-500 text-lg font-bold justify-start">
                    <div>
                      <span className="block text-3xl sm:text-4xl tabular-nums">
                        {timeLeft.hours ?? "00"}
                      </span>
                      <span className="text-sm opacity-70">Hours</span>
                    </div>
                    <div>
                      <span className="block text-3xl sm:text-4xl tabular-nums">
                        {timeLeft.minutes ?? "00"}
                      </span>
                      <span className="text-sm opacity-70">Minutes</span>
                    </div>
                    <div>
                      <span className="block text-3xl sm:text-4xl tabular-nums">
                        {timeLeft.seconds ?? "00"}
                      </span>
                      <span className="text-sm opacity-70">Seconds</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-500 font-semibold mt-4 text-center">Event Ended</p>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
