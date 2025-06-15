import React, { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";

const FoodPurchase = () => {
  const {
    _id,
    name,
    price,
    quantity,
    image,
    addedByEmail,
    addedByName,
    origin,
  } = useLoaderData();

  const { user } = useContext(AuthContext);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const navigate = useNavigate();

  const isOwnFood = user.email === addedByEmail;
  const isOutOfStock = quantity === 0;

  const handlePurchase = async (e) => {
    e.preventDefault();

    if (purchaseQuantity > quantity) {
      toast.error("Purchase quantity exceeds available stock.");
      return;
    }

    const order = {
      image,
      foodId: _id,
      foodName: name,
      price,
      origin,
      quantity: purchaseQuantity,
      buyerName: user.displayName,
      sellerEmail: addedByEmail,
      sellerName: addedByName,
      buyerEmail: user.email,
      date: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "https://restaurant-management-server-psi.vercel.app/orders",
        order
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Order placed successfully!");

        const newQuantity = quantity - purchaseQuantity;
        await axios.patch(
          `https://restaurant-management-server-psi.vercel.app/foods/${_id}`,
          {
            newQuantity: newQuantity,
          }
        );

        navigate("/my-orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place the order.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Purchase Food
      </h2>

      {isOwnFood ? (
        <div className="text-center text-red-600 text-lg font-semibold">
          You cannot purchase your own added food item.
        </div>
      ) : isOutOfStock ? (
        <div className="text-center text-red-600 text-lg font-semibold">
          This food item is currently out of stock. Please try again later.
        </div>
      ) : null}

      <form
        onSubmit={handlePurchase}
        className={`w-full max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-lg space-y-4 ${
          isOwnFood || isOutOfStock ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div>
          <label className="label font-semibold text-base-content">
            Food Name
          </label>
          <input
            type="text"
            value={name}
            disabled
            className="input text-lg input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold text-base-content">Price</label>
          <input
            type="text"
            value={`$${price}`}
            disabled
            className="input text-lg input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold text-base-content">
            Quantity (Available: {quantity})
          </label>
          <input
            type="number"
            min={1}
            max={quantity}
            value={purchaseQuantity}
            onChange={(e) => setPurchaseQuantity(parseInt(e.target.value))}
            required
            className="input text-lg input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold text-base-content">
            Buyer Name
          </label>
          <input
            type="text"
            value={user.displayName}
            disabled
            className="input text-lg input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold text-base-content">
            Buyer Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="input text-lg input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isOwnFood || isOutOfStock}
        >
          Purchase
        </button>
      </form>
    </div>
  );
};

export default FoodPurchase;
