import useAxiosSecure from "./useAxiosSecure";

const UpdateFoodApi = () => {
  const axiosSecure = useAxiosSecure();

  const updateFood = async (id, foodData) => {
    return axiosSecure.put(`/foods/${id}`, foodData);
  };

  return { updateFood };
};

export default UpdateFoodApi;
