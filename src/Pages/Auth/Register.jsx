import React, { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";

const Register = () => {
  const [active, setActive] = useState(false);
  const { createUser, googleLogin } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    console.log(name, photoURL);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must have 1 uppercase, 1 lowercase and be at least 6 characters long"
      );
      return;
    }

    try {
      const result = await createUser(email, password);
      toast.success("Registration successful!");
      form.reset();
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      toast.success("Google Signup successful!");
    } catch (error) {
      toast.error(error.message || "Google Signup failed");
    }
  };

  return (
    <div>
      <Toaster />
      <main className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center sm:py-12 p-6">
        <form
          onSubmit={handleRegister}
          className="w-full sm:w-[900px] sm:max-w-[1000px] bg-base-200 rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5"
        >
          <h3 className="text-[1.8rem] font-[700] py-10 text-yellow-500 text-center">
            Register
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="py-3 px-4 border border-gray-300 rounded-lg w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="py-3 px-4 border border-gray-300 rounded-lg w-full"
          />

          <input
            type="url"
            name="photoURL"
            placeholder="Photo URL"
            required
            className="py-3 px-4 border border-gray-300 rounded-lg w-full"
          />

          <div className="relative w-full">
            <input
              type={active ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="py-3 px-4 border border-gray-300 rounded-lg w-full"
            />
            {active ? (
              <BsEyeSlash
                className="absolute top-[30%] right-[5%] cursor-pointer text-gray-500"
                onClick={() => setActive(false)}
              />
            ) : (
              <BsEye
                className="absolute top-[30%] right-[5%] cursor-pointer text-gray-500"
                onClick={() => setActive(true)}
              />
            )}
          </div>

          <div className="text-sm">
            <input type="checkbox" name="checkbox" id="checkbox" />{" "}
            <label htmlFor="checkbox">
              By clicking, I agree to{" "}
              <a href="#" className="text-blue-500">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500">
                Privacy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg"
          >
            Register
          </button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <hr className="w-1/2" />
            <span>or</span>
            <hr className="w-1/2" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="flex items-center justify-center py-2 px-4 gap-4 border text-white rounded-lg bg-blue-500"
          >
            <FcGoogle className="text-2xl" />
            Signup with Google
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
