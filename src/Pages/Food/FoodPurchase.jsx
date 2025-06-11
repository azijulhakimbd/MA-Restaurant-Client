import React, { useState, useContext } from "react";
import { Link, useLoaderData } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";

const FoodPurchase = () => {
  const { _id, name, price, quantity } = useLoaderData();
  const { user } = useContext(AuthContext);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const handlePurchase = async (e) => {
    e.preventDefault();

    const order = {
      foodId: _id,
      foodName: name,
      price,
      quantity: purchaseQuantity,
      buyerName: user.displayName,
      buyerEmail: user.email,
      date: Date.now(),
    };

    try {
      const response = await axios.post("http://localhost:3000/orders", order);
      if (response.status === 200 || response.status === 201) {
        toast.success("Order placed successfully!");
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

      <form
        onSubmit={handlePurchase}
        className="w-full max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-lg space-y-4"
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
            Quantity
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
        <Link to={'/my-orders'}><button type="submit" className="btn btn-primary w-full mt-4">
          Purchase
        </button></Link>
        
      </form>
    </div>
  );
};

export default FoodPurchase;
