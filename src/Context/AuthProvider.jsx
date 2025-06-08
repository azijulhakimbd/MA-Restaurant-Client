import React, {  useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Register with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update User
    const userUpdate=(updatedUser)=>{
      return updateProfile(auth.currentUser, updatedUser)
    }

  // Observe user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Clean up the observer on unmount
    return () => unsubscribe();
  }, []);

  // Context value
  const userInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logOut,userUpdate
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
