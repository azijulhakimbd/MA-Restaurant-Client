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

    //  Password Validation
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

      const result = await createUser(email.value, password.value);
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
    <div>
      <main className="w-full min-h-screen bg-base-300 flex items-center justify-center p-6 sm:py-12">
        <form
          onSubmit={handleRegister}
          className="w-full sm:w-[900px] max-w-[1000px] bg-base-200 rounded-lg p-4 sm:p-8 flex flex-col gap-5"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-yellow-500 text-center py-6">
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
              className="input input-bordered w-full"
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

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="checkbox" /> I agree to{" "}
            <a href="#" className="text-blue-500">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500">
              Privacy
            </a>
          </label>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
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
            className="btn w-full flex items-center justify-center gap-3 bg-blue-500 text-white"
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
