import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateFoodApi from "../../Hook/UpdateFoodApi";
import { motion } from "framer-motion";

const UpdateFood = () => {
  const { user } = useContext(AuthContext);
  const { updateFood } = UpdateFoodApi();
  const loadedData = useLoaderData();

  const [isLoading, setIsLoading] = useState(true);

  const { _id, name, image, category, origin, quantity, price, description } =
    loadedData || {};

  useEffect(() => {
    // Simulate a short delay for skeleton effect
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFoods = Object.fromEntries(formData.entries());

    try {
      const res = await updateFood(_id, updatedFoods);
      if (res.data.modifiedCount > 0) {
        toast.success("Food item updated successfully!", {
          position: "top-right",
        });
      } else {
        toast.info("⚠️ No changes made or already up to date.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating food:", error);
      toast.error("Failed to update food item.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <motion.h2
        className="text-3xl font-bold text-center mb-6 text-base-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Update Food Item
      </motion.h2>

      {isLoading ? (
        // Skeleton Loader
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-6 rounded-lg shadow-lg animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      ) : (
        // Actual Form
        <motion.form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Food Name */}
          <div>
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              placeholder="Enter food name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Food Image URL */}
          <div>
            <label className="label">
              <span className="label-text">Food Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              defaultValue={image}
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </div>

          {/* Food Category */}
          <div>
            <label className="label">
              <span className="label-text">Food Category</span>
            </label>
            <input
              type="text"
              name="category"
              defaultValue={category}
              placeholder="e.g. Dessert, Main Course"
              className="input input-bordered w-full"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              name="quantity"
              defaultValue={quantity}
              min={1}
              placeholder="Available quantity"
              className="input input-bordered w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              defaultValue={price}
              min={0}
              step="0.01"
              placeholder="Price in USD"
              className="input input-bordered w-full"
            />
          </div>

          {/* Food Origin */}
          <div>
            <label className="label">
              <span className="label-text">Food Origin (Country)</span>
            </label>
            <input
              type="text"
              name="origin"
              defaultValue={origin}
              placeholder="Country of origin"
              className="input input-bordered w-full"
            />
          </div>

          {/* Added By Name */}
          <div>
            <label className="label">
              <span className="label-text">Added By (Name)</span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered bg-base-200 w-full"
            />
          </div>

          {/* Added By Email */}
          <div>
            <label className="label">
              <span className="label-text">Added By (Email)</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered bg-base-200 w-full"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              defaultValue={description}
              rows={4}
              placeholder="Write a short description"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center mt-4">
            <motion.button
              type="submit"
              className="btn btn-success px-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Item
            </motion.button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default UpdateFood;
