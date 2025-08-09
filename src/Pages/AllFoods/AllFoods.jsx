import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../../Components/FoodCard";
import { motion, AnimatePresence } from "framer-motion";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://restaurant-management-server-psi.vercel.app/foods")
      .then((res) => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  }, []);

  const filteredFoods = foods.filter(
    (food) =>
      food.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-500">
      {/* Title */}
      <div className="bg-base-200 py-16 shadow-inner text-center">
        <motion.h1
          className="text-4xl font-bold text-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          All Foods
        </motion.h1>
        <motion.p
          className="text-base-content/70 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Browse all available delicious meals
        </motion.p>
      </div>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <motion.input
          type="text"
          placeholder="Search by name or category..."
          className="input input-bordered w-full bg-base-100 text-base-content"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {loading ? (
          // Skeleton cards while loading
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="card bg-base-100 border border-base-300 shadow-sm animate-pulse"
            >
              <div className="h-48 bg-gray-300 rounded-t"></div>
              <div className="card-body space-y-3">
                <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-9 w-full bg-gray-300 rounded"></div>
              </div>
            </div>
          ))
        ) : filteredFoods.length === 0 ? (
          <p className="col-span-full text-center text-base-content/60 text-xl">
            No foods found.
          </p>
        ) : (
          <AnimatePresence>
            {filteredFoods.map((food, i) => (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <FoodCard food={food} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
