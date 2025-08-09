import useAxiosSecure from './useAxiosSecure';

const MyFoodsApi = () => {
  const myFoodsSecure = useAxiosSecure();

  
  const getFoodsByEmail = (email) => {
    return myFoodsSecure.get(`/foods?email=${email}`);
  };

  return { getFoodsByEmail };
};

export default MyFoodsApi;
