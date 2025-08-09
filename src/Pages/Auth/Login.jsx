import React, { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

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
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full sm:w-[500px] bg-base-200/30 backdrop-blur-md rounded-lg p-8 flex flex-col gap-5 shadow-lg"
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
            className="py-3 px-4 border border-gray-300 rounded-lg w-full pr-12"
          />
          {showPassword ? (
            <BsEyeSlash
              onClick={() => setShowPassword(false)}
              className="absolute top-3 right-4 text-gray-500 cursor-pointer text-xl"
            />
          ) : (
            <BsEye
              onClick={() => setShowPassword(true)}
              className="absolute top-3 right-4 text-gray-500 cursor-pointer text-xl"
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
          className="flex items-center justify-center gap-3 py-3 text-white rounded-lg bg-blue-500 hover:bg-blue-600"
        >
          <FcGoogle className="text-2xl" />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
