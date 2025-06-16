import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateFoodApi from "../../Hook/UpdateFoodApi";


const UpdateFood = () => {
  const { user } = useContext(AuthContext);
  const { updateFood } = UpdateFoodApi();

  const { _id, name, image, category, origin, quantity, price, description } =
    useLoaderData();

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
      <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
        Update Food Item
      </h2>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-6 rounded-lg shadow-lg"
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
          <button type="submit" className="btn btn-success px-10">
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFood;
