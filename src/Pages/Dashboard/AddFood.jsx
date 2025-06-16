import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import AddFoodApi from "../../Hook/AddFoodApi";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const { addFood } = AddFoodApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newFood = {
      name: form.name.value.trim(),
      image: form.image.value.trim(),
      category: form.category.value.trim(),
      quantity: Number(form.quantity.value),
      price: Number(form.price.value),
      origin: form.origin.value.trim(),
      description: form.description.value.trim(),
      addedByName: user?.displayName || "Unknown",
      addedByEmail: user?.email || "Unknown",
      purchaseCount: 0,
      dateAdded: Date.now(),
    };

    try {
      const response = await addFood(newFood);

      if (response.data.insertedId || response.data.success) {
        toast.success("Food item added successfully!");
        form.reset();
      } else {
        toast.error("Failed to add food item. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the food item.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
        Add New Food Item
      </h2>

      <form
        onSubmit={handleSubmit}
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
            placeholder="Country of origin"
            className="input input-bordered w-full"
          />
        </div>

        {/* Added By Name (readonly) */}
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

        {/* Added By Email (readonly) */}
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
            <span className="label-text">
              Description (ingredients, making procedure, etc.)
            </span>
          </label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Write a short description"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button type="submit" className="btn btn-success px-10">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
