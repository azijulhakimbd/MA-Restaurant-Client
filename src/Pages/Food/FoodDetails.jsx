import { useLoaderData, useNavigate } from "react-router";

const FoodDetails = () => {
  const {
    _id,
    name,
    image,
    category,
    origin,
    quantity,
    price,
    description,
    purchaseCount,
  } = useLoaderData();

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="card lg:card-side w-11/12 h-100 bg-base-100 shadow-xl">
        <figure className="w-200 h-100">
          <img
            src={image}
            alt={name}
            className="w-200 h-100"
          />
        </figure>
        <div className="card-body lg:w-1/2 py-5">
          <div className="items-center">
            <h2 className="card-title text-2xl  text-yellow-500 md:text-3xl font-bold">{name}</h2>
          <p className="text-lg">Category: {category}</p>
          <p className="text-lg">Origin: {origin}</p>
          <p className="text-lg">Available Quantity: {quantity}</p>
          <p className="text-green-600 font-bold text-xl">Price: ${price}</p>
          <p className="text-lg">{description}</p>
          <p>
            Purchase Count:{" "}
            <span className="font-bold text-success">{purchaseCount || 0}</span>
          </p>
          </div>

          <div className="card-actions mt-4">
            <button
              onClick={() => navigate(`/purchase/${_id}`)}
              disabled={quantity === 0}
              className={`btn w-full md:w-auto ${
                quantity === 0 ? "btn-disabled" : "btn-primary"
              }`}
            >
              {quantity === 0 ? "Out of Stock" : "Purchase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
