import { useForm, ValidationError } from "@formspree/react";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
import newsletterAnimation from "../../assets/Lottie/Newsletter.json";  

const NewsletterSubscribe = () => {
  const [state, handleSubmit] = useForm("xgvyakpz");

  if (state.succeeded) {
    return (
      <div className="text-center mt-6 text-green-600 font-semibold">
        🎉 Thanks for subscribing to our newsletter!
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden my-5 border rounded-4xl border-amber-300">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <div className="carousel w-full h-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://i.postimg.cc/Rh2hPwnm/vinn-koonyosying-v-BOxs-Zrfi-Cw-unsplash.jpg"
              className="w-full h-full object-cover rounded-3xl"
              alt="bg1"
            />
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://i.postimg.cc/26cVZskV/we-the-creators-5mpht0-M5-H0-E-unsplash.jpg"
              className="w-full h-full object-cover rounded-3xl"
              alt="bg2"
            />
          </div>
        </div>
      </div>

      {/* Overlay & Form */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
        <div className="text-center max-w-xl w-full px-6">
          <div className="w-40 mx-auto mb-4">
            <Lottie animationData={newsletterAnimation} loop={true} />
          </div>
          <h1 className="text-5xl text-yellow-500 font-semibold mb-6">
            <span>
              <Typewriter
                cursor
                cursorBlinking
                delaySpeed={1000}
                deleteSpeed={25}
                loop={0}
                typeSpeed={75}
                words={["Subscribe to Our Newsletter"]}
              />
            </span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered lg:w-full sm:w-auto"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className="btn btn-accent"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;
