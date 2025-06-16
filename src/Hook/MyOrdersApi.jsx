import useAxiosSecure from "./useAxiosSecure";

const MyOrdersApi = () => {
  const axiosSecure = useAxiosSecure();

  const getOrders = (email) => {
    return axiosSecure.get(`/orders?email=${email}`);
  };

  const deleteOrder = (id) => {
    return axiosSecure.delete(`/orders/${id}`);
  };

  return {
    getOrders,
    deleteOrder
  };
};

export default MyOrdersApi;
