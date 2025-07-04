import React from "react";
import { Link } from "react-router"; 
import Lottie from "lottie-react";
import errorAnimation from "../assets/lottie/Error.json"; 

const NotFound = () => {
  return (
    <div>
      <section className="flex h-screen items-center p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <Lottie
              animationData={errorAnimation}
              loop={true}
              className="w-72 mx-auto mb-6"
            />
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-600">
              But don’t worry, you can find plenty of other things on our homepage.
            </p>
            <Link
              to="/"
              className="px-8 btn py-3 font-semibold rounded dark:bg-yellow-500"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
