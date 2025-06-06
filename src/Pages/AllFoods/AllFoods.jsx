import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../../Components/FoodCard";


const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/foods")
      .then((res) => setFoods(res.data))
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Title */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800 h-60 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">All Foods</h1>
      </div>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="input input-bordered w-full max-w-full p-3 text-base-content dark:text-white bg-white dark:bg-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {filteredFoods.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-xl">
            No foods found.
          </p>
        ) : (
          filteredFoods.map((food) => <FoodCard key={food._id} food={food} />)
        )}
      </div>
    </div>
  );
};

export default AllFoods;
