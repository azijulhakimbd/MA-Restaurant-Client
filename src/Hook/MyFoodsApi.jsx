import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const MyFoodsApi = () => {
    const myFoodsSecure = useAxiosSecure();
    const myFoods = email => {
        return myFoodsSecure.get(`/foods?email=${email}`)
    }
    return myFoods;
};

export default MyFoodsApi;