import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../../Components/FoodCard";
import Spinner from "../../Components/Spinner";

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
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-500">
      {/* Title */}
      <div className="bg-base-200 py-16 shadow-inner text-center">
        <h1 className="text-4xl font-bold text-primary">All Foods</h1>
        <p className="text-base-content/70 mt-2">
          Browse all available delicious meals
        </p>
      </div>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="input input-bordered w-full bg-base-100 text-base-content"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {filteredFoods.length === 0 ? (
          <p className="col-span-full text-center text-base-content/60 text-xl">
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
