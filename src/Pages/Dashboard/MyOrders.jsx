import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";
import MyOrdersApi from "../../Hook/MyOrdersApi";
import { motion } from "framer-motion";

// Skeleton Row for Loading State
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td>
      <div className="h-4 w-6 bg-base-300 rounded"></div>
    </td>
    <td className="flex items-center gap-2">
      <div className="w-12 h-12 bg-base-300 rounded"></div>
      <div className="h-4 w-24 bg-base-300 rounded"></div>
    </td>
    <td>
      <div className="h-4 w-12 bg-base-300 rounded"></div>
    </td>
    <td>
      <div className="h-4 w-10 bg-base-300 rounded"></div>
    </td>
    <td>
      <div className="h-4 w-20 bg-base-300 rounded"></div>
    </td>
    <td>
      <div className="h-4 w-28 bg-base-300 rounded"></div>
    </td>
    <td>
      <div className="h-8 w-16 bg-base-300 rounded"></div>
    </td>
  </tr>
);

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

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-primary"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        My Orders
      </motion.h2>

      {loading ? (
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
              {[...Array(4)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      ) : orders.length === 0 ? (
        <motion.p
          className="text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You have not ordered any food yet.
        </motion.p>
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
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {orders.map((order, idx) => (
                <motion.tr
                  key={order._id}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
