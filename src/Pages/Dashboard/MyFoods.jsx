import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";
import MyFoodsApi from "../../Hook/MyFoodsApi";
import { motion } from "framer-motion";

// Simple Skeleton Loader Component
const SkeletonRow = () => (
  <tr className="border-t border-base-300 animate-pulse">
    <td className="p-4">
      <div className="h-16 w-16 bg-base-300 rounded"></div>
    </td>
    <td className="p-4">
      <div className="h-4 w-24 bg-base-300 rounded"></div>
    </td>
    <td className="p-4">
      <div className="h-4 w-12 bg-base-300 rounded"></div>
    </td>
    <td className="p-4">
      <div className="h-4 w-12 bg-base-300 rounded"></div>
    </td>
    <td className="p-4">
      <div className="h-8 w-16 bg-base-300 rounded"></div>
    </td>
  </tr>
);

const SkeletonCard = () => (
  <div className="card bg-base-100 shadow-md rounded-box p-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 bg-base-300 rounded"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-base-300 rounded"></div>
        <div className="h-4 w-20 bg-base-300 rounded"></div>
        <div className="h-4 w-16 bg-base-300 rounded"></div>
      </div>
    </div>
    <div className="mt-4 text-right">
      <div className="h-8 w-16 bg-base-300 rounded"></div>
    </div>
  </div>
);

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getFoodsByEmail } = MyFoodsApi();

  useEffect(() => {
    if (user?.email) {
      getFoodsByEmail(user.email)
        .then((res) => {
          setMyFoods(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading foods:", err);
          toast.error("Failed to load your foods.");
          setLoading(false);
        });
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen px-4 py-8 mx-auto w-11/12">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-base-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        My Foods
      </motion.h2>

      {loading ? (
        <>
          {/* Skeleton for table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full bg-base-100 rounded-box shadow">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(4)].map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Skeleton for cards */}
          <div className="md:hidden flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      ) : myFoods.length === 0 ? (
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You haven’t added any foods yet.
        </motion.p>
      ) : (
        <>
          {/* Table view for md and up */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full bg-base-100 rounded-box shadow">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.05 },
                  },
                }}
              >
                {myFoods.map((food) => (
                  <motion.tr
                    key={food._id}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-base-300"
                  >
                    <td className="p-4">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                    </td>
                    <td className="p-4">{food.name}</td>
                    <td className="p-4">${food.price}</td>
                    <td className="p-4">{food.quantity}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link to={`/dashboard/update-food/${food._id}`}>
                          <button className="btn btn-sm btn-info text-white">
                            Update
                          </button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

          {/* Card view for small screens */}
          <motion.div
            className="md:hidden flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {myFoods.map((food) => (
              <motion.div
                key={food._id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="card bg-base-100 shadow-md rounded-box p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{food.name}</h3>
                    <p className="text-sm text-base-content">
                      Price: ${food.price}
                    </p>
                    <p className="text-sm text-base-content">
                      Quantity: {food.quantity}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link to={`/dashboard/update-food/${food._id}`}>
                    <button className="btn btn-sm btn-info text-white">
                      Update
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default MyFoods;
