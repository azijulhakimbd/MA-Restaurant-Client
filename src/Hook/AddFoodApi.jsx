import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const AddFoodApi = () => {
    const axiosSecure = useAxiosSecure();
    const addFood = (foodData) => {
    return axiosSecure.post("/foods", foodData);
  };
    return { addFood };
};

export default AddFoodApi;