import React, { createContext, useState } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

//   Email and Password Login
//  const userLogin=(email,password)=>{
//     return createUserWithEmailAndPassword;
//  }
  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
