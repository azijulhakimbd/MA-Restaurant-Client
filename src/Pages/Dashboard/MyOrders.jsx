import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";
import MyOrdersApi from "../../Hook/MyOrdersApi";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getOrders, deleteOrder } = MyOrdersApi();

  useEffect(() => {
    if (user?.email) {
      getOrders(user.email)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch your orders.");
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteOrder(id);
      if (res.status === 200) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        toast.success("Order deleted and stock restored!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the order.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner text-primary text-3xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-lg">
          You have not ordered any food yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 shadow-md rounded-lg">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Seller</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id}>
                  <td>{idx + 1}</td>
                  <td className="flex items-center gap-2">
                    <img
                      src={order.image}
                      alt={order.foodName}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <span>{order.foodName}</span>
                  </td>
                  <td>${order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.sellerName}</td>
                  <td>{moment(order.date).format("MMMM Do YYYY, h:mm A")}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
