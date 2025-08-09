import React, { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../Firebase/firebase.config";
import { toast } from "react-toastify";

const Register = () => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createUser, googleLogin, userUpdate, setUser } =
    useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { name, email, photoURL, password, checkbox } = form.elements;

    if (!checkbox.checked) {
      toast.error("You must accept the Terms and Privacy Policy.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password.value)) {
      toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      setLoading(true);
      toast.dismiss();

      await createUser(email.value, password.value);
      await userUpdate({
        displayName: name.value,
        photoURL: photoURL.value,
      });

      setUser(auth.currentUser);

      toast.success("Registration successful!");
      form.reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use.");
      } else {
        toast.error(error.message || "Registration failed");
      }
    } finally {
      setLoading(false);
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
      <main className="relative z-10 w-full max-w-lg bg-base-100/30 backdrop-blur-md rounded-lg shadow-lg p-6 sm:p-8">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-5"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-yellow-500 text-center">
            Register
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="input input-bordered w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="input input-bordered w-full"
          />

          <input
            type="url"
            name="photoURL"
            placeholder="Photo URL"
            required
            className="input input-bordered w-full"
          />

          <div className="relative w-full">
            <input
              type={active ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="input input-bordered w-full pr-12"
            />
            {active ? (
              <BsEyeSlash
                className="absolute top-3 right-4 cursor-pointer text-gray-500"
                onClick={() => setActive(false)}
              />
            ) : (
              <BsEye
                className="absolute top-3 right-4 cursor-pointer text-gray-500"
                onClick={() => setActive(true)}
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm flex-wrap">
            <input type="checkbox" name="checkbox" /> I agree to{" "}
            <a href="#" className="text-blue-500">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500">
              Privacy
            </a>
          </label>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <hr className="w-1/2 border-base-300" />
            <span className="text-xs text-base-content/60">or</span>
            <hr className="w-1/2 border-base-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="btn w-full flex items-center justify-center gap-3 bg-blue-500 text-lg hover:bg-blue-600"
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
