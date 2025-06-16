import useAxiosSecure from "./useAxiosSecure";

const FoodPurchaseApi = () => {
  const axiosSecure = useAxiosSecure();

  // Place a new order
  const placeOrder = (orderData) => {
    return axiosSecure.post("/orders", orderData);
  };

  // Update food quantity by incrementing or decrementing
  const updateFoodQuantity = (id, addedQuantity) => {
    return axiosSecure.patch(`/foods/${id}`, { addedQuantity });
  };

  return {
    placeOrder,
    updateFoodQuantity,
  };
};

export default FoodPurchaseApi;
