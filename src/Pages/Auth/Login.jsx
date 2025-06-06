import React, { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router";

import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      form.reset();
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed");
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-base-300 flex items-center justify-center p-6">
        <Toaster />
        <form
          onSubmit={handleLogin}
          className="w-full sm:w-[500px] bg-base-200 rounded-lg p-8 flex flex-col gap-5 shadow-md"
        >
          <h2 className="text-3xl font-bold text-center text-yellow-500">
            Login
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="py-3 px-4 border border-gray-300 rounded-lg w-full"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="py-3 px-4 border border-gray-300 rounded-lg w-full"
            />
            {showPassword ? (
              <BsEyeSlash
                onClick={() => setShowPassword(false)}
                className="absolute top-1/3 right-4 text-gray-500 cursor-pointer text-xl"
              />
            ) : (
              <BsEye
                onClick={() => setShowPassword(true)}
                className="absolute top-1/3 right-4 text-gray-500 cursor-pointer text-xl"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

          <div className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <hr className="w-1/2" />
            <span className="text-gray-500">or</span>
            <hr className="w-1/2" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 py-3 border text-white rounded-lg bg-blue-500"
          >
            <FcGoogle className="text-2xl" />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
