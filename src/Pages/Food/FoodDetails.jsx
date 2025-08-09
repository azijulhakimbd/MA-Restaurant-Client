import { Link, useLoaderData } from "react-router";

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

  return (
    <div className="min-h-screen mx-auto px-20 flex items-center justify-center bg-base-200 py-10">
      <div className="card w-full h-150 bg-base-100 shadow-xl flex flex-col lg:flex-row">
        {/* Image Section */}
        <figure className="w-full lg:w-1/2 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Details Section */}
        <div className="card-body w-full lg:w-1/2">
          <h2 className="card-title text-yellow-500 text-2xl md:text-3xl font-bold">
            {name}
          </h2>
          <p className="text-base md:text-lg">Category: <span className="font-medium">{category}</span></p>
          <p className="text-base md:text-lg">Origin: <span className="font-medium">{origin}</span></p>
          <p className="text-base md:text-lg">Available Quantity: <span className="font-medium">{quantity}</span></p>
          <p className="text-green-600 font-bold text-lg md:text-xl">Price: ${price}</p>
          <p className="text-base md:text-lg">{description}</p>
          <p className="text-base md:text-lg">
            Purchase Count:{" "}
            <span className="font-bold text-success">{purchaseCount || 0}</span>
          </p>

          {/* Purchase Button */}
          <div className="card-actions mt-4">
            <Link to={`/food-purchase/${_id}`} className="w-full md:w-auto">
              <button
                disabled={quantity === 0}
                className={`btn w-full bg-yellow-500 md:w-auto ${
                  quantity === 0 ? "btn-disabled" : "btn-yellow"
                }`}
              >
                {quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
