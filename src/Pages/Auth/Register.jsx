import React, { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router"; 
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../Firebase/firebase.config"; 

const Register = () => {
  const [active, setActive] = useState(false);
  const { createUser, googleLogin, userUpdate, setUser } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    const termsAccepted = form.checkbox.checked;

    if (!termsAccepted) {
      toast.error("You must accept the Terms and Privacy Policy.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must have 1 uppercase, 1 lowercase and be at least 6 characters long");
      return;
    }

    try {
      const result = await createUser(email, password);
      await userUpdate({ displayName: name, photoURL });

      //  Fetch updated user from Firebase
      const updatedUser = auth.currentUser;
      setUser(updatedUser);

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

          <div className="text-sm">
            <input type="checkbox" name="checkbox" id="checkbox" />{" "}
            <label htmlFor="checkbox">
              By clicking, I agree to{" "}
              <a href="#" className="text-blue-500">Terms</a> and{" "}
              <a href="#" className="text-blue-500">Privacy</a>
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">Log in</Link>
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
