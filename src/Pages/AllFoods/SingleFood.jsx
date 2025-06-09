import { useLoaderData, useNavigate } from "react-router";

const SingleFood = () => {
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
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="w-full lg:w-1/2">
          <img
            src={image || "/placeholder.jpg"}
            alt={name}
            className="object-cover h-full w-full"
          />
        </figure>
        <div className="card-body w-full lg:w-1/2">
          <h2 className="card-title text-2xl md:text-3xl font-bold">{name}</h2>
          <p className="text-gray-600">Category: {category}</p>
          <p className="text-gray-600">Origin: {origin}</p>
          <p className="text-gray-600">Available Quantity: {quantity}</p>
          <p className="text-green-600 font-bold text-xl">Price: ${price}</p>
          <p className="text-gray-700">{description}</p>
          <p>
            Purchase Count:{" "}
            <span className="font-bold">{purchaseCount || 0}</span>
          </p>

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

export default SingleFood;
