import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import MyFoodsApi from "../../Hook/MyFoodsApi";
import MyOrdersApi from "../../Hook/MyOrdersApi";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { getFoodsByEmail } = MyFoodsApi();
  const { getOrders } = MyOrdersApi();

  const [myFoodsCount, setMyFoodsCount] = useState(null);
  const [myOrdersCount, setMyOrdersCount] = useState(null);
  

  useEffect(() => {
    if (user?.email) {
     
      Promise.all([getFoodsByEmail(user.email), getOrders(user.email)])
        .then(([foodsRes, ordersRes]) => {
          setMyFoodsCount(foodsRes.data.length);
          setMyOrdersCount(ordersRes.data.length);
          
        })
        .catch((err) => {
          console.error("Failed to fetch data:", err);
        });
    }
  }, [user?.email, getFoodsByEmail, getOrders]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen p-6 bg-base-100  transition-colors duration-500">
      <h1 className="text-3xl text-yellow-400 font-bold mb-6">
        Welcome, {user?.displayName || <Skeleton width={150} />}
      </h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* My Foods Card */}
        <div className="bg-base-200  shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-400 ">
            My Foods
          </h2>
          <p className="text-4xl font-bold text-blue-500 mt-3">
            {myFoodsCount}
          </p>
        </div>

        {/* My Orders Card */}
        <div className="bg-base-200 shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-400 ">
            My Orders
          </h2>
          <p className="text-4xl font-bold text-blue-500 mt-3">
            { myOrdersCount}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
