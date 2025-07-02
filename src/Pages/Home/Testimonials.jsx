import React from "react";
import { FaStar } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
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
  return (
    <section className="bg-base-100 text-base-content py-12 px-4 max-w-7xl mx-auto">
      {/* Animated Heading */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-32 mb-4">
          <Lottie animationData={reviewAnimation} loop={true} />
        </div>
        <h2 className="text-4xl font-bold text-yellow-500 text-center">
          <Typewriter
            cursor
            cursorBlinking
            delaySpeed={1000}
            deleteSpeed={25}
            loop={0}
            typeSpeed={75}
            words={["What Our Customers Say"]}
          />
        </h2>
      </div>

      {/* Detailed Reviews with avatars and stars */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {detailedReviews.map((review, idx) => (
          <div
            key={`detailed-${idx}`}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
