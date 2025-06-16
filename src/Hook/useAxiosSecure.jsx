import React, { use } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
const axiosInstance = axios.create({
  baseURL: "https://restaurant-management-server-psi.vercel.app",
});
const useAxiosSecure = () => {
  const { user } = use(AuthContext);
  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
  });
  return axiosInstance;
};

export default useAxiosSecure;
