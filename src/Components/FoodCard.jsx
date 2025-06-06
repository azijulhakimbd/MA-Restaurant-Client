import { Link } from "react-router";

const FoodCard = ({ food }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={food.image}
        alt={food.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1 text-base-content dark:text-white">
          {food.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
          Category: {food.category}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
          Origin: {food.origin}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
          Quantity:
          {food.quantity === 0 ? (
            <span className="text-red-600 font-bold ml-1">Out of Stock</span>
          ) : (
            <span className="ml-1">{food.quantity}</span>
          )}
        </p>
        <p className="text-lg font-bold mt-1 text-green-600 dark:text-green-400">
          ${food.price}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
          {food.description?.slice(0, 80)}...
        </p>

        <Link to={`/foods/${food._id}`}>
          <button
            disabled={food.quantity === 0}
            className={`mt-4 w-full py-2 rounded-lg text-white ${
              food.quantity === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
