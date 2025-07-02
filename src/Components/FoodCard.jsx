import { Link } from "react-router";

const FoodCard = ({ food }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 border border-base-300">
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body text-base-content">
        <h2 className="card-title text-lg md:text-xl">{food.name}</h2>

        <p className="text-sm opacity-80">
          <span className="font-semibold">Category:</span> {food.category}
        </p>
        <p className="text-sm opacity-80">
          <span className="font-semibold">Origin:</span> {food.origin}
        </p>
        <p className="text-sm opacity-80">
          <span className="font-semibold">Quantity:</span>{" "}
          {food.quantity === 0 ? (
            <span className="text-error font-semibold">Out of Stock</span>
          ) : (
            <span>{food.quantity}</span>
          )}
        </p>

        <p className="text-primary text-lg font-bold">${food.price}</p>

        <p className="text-sm opacity-70">
          {food.description?.slice(0, 80)}...
        </p>

        <Link to={`/foods/${food._id}`} className="mt-4">
          <button
            disabled={food.quantity === 0}
            className={`btn border bg-yellow-500 btn-sm w-full mt-2 ${
              food.quantity === 0 ? "btn-disabled" : "btn-yellow-500"
            }`}
          >
           Food Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
