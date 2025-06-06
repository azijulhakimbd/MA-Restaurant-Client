import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all foods from backend
  useEffect(() => {
    axios.get('http://localhost:3000/foods') 
      .then(response => setFoods(response.data))
      .catch(error => console.error('Error fetching foods:', error));
  }, []);

  // Filter based on search
  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Title Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-60 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">All Foods</h1>
      </div>

      {/* Search Box */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {filteredFoods.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-xl">No foods found.</p>
        ) : (
          filteredFoods.map(food => (
            <div key={food._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <img src={food.image} alt={food.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{food.name}</h2>
                <p className="text-gray-600 text-sm mb-1">Category: {food.category}</p>
                <p className="text-gray-600 text-sm mb-1">Origin: {food.origin}</p>
                <p className="text-gray-600 text-sm mb-1">Quantity: 
                  {food.quantity === 0 ? (
                    <span className="text-red-600 font-bold ml-1">Out of Stock</span>
                  ) : (
                    <span className="ml-1">{food.quantity}</span>
                  )}
                </p>
                <p className="text-lg font-bold mt-1 text-green-600">${food.price}</p>
                <p className="text-gray-700 text-sm mt-2">{food.description?.slice(0, 80)}...</p>

                <Link to={`/foods/${food._id}`}>
                  <button
                    disabled={food.quantity === 0}
                    className={`mt-4 w-full py-2 rounded-lg text-white ${food.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllFoods;
