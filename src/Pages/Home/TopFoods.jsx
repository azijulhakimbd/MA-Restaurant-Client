import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/topFoods") 
      .then((res) => setTopFoods(res.data))
      .catch((err) => {
        console.error("Failed to fetch top foods", err);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-10 text-yellow-500">
        🍽️ Top Selling Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {topFoods.map((food) => (
          <div key={food._id} className="card bg-base-200 shadow-md hover:shadow-lg transition duration-300">
            <figure>
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-80 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-yellow-500">{food.name}</h3>
              <p><span className="font-semibold">Origin:</span> {food.origin}</p>
              <p><span className="font-semibold">Price:</span> ${food.price}</p>
              <p><span className="font-semibold text-success">Sold:</span> {food.purchaseCount || 0} times</p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/foods/${food._id}`}>
                  <button className="btn bg-yellow-500 btn-sm">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/all-foods")}
          className="btn btn-outline bg-yellow-500"
        >
          See All Foods
        </button>
      </div>
    </div>
  );
};

export default TopFoods;
