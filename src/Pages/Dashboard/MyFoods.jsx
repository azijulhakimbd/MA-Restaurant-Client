import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/foods?userEmail=${user.email}`)
      .then((res) => setMyFoods(res.data))
      .catch((err) => console.error(err));
  }, [user.email]);

  const openEditModal = (food) => {
    setEditingFood(food);
    setUpdateData({
      name: food.name,
      price: food.price,
      quantity: food.quantity,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/foods/${editingFood._id}`,
        updateData
      );
      toast.success("Food updated successfully!");
      // Update local state
      setMyFoods((prev) =>
        prev.map((food) =>
          food._id === editingFood._id ? { ...food, ...updateData } : food
        )
      );
      setEditingFood(null); // close modal
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Foods</h2>
      {myFoods.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any foods yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.map((food) => (
                <tr key={food._id} className="border-t">
                  <td className="p-4">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                  </td>
                  <td className="p-4">{food.name}</td>
                  <td className="p-4">${food.price}</td>
                  <td className="p-4">{food.quantity}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openEditModal(food)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {editingFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-500"
              onClick={() => setEditingFood(null)}
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Update Food</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-sm">Name</label>
                <input
                  type="text"
                  value={updateData.name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Price</label>
                <input
                  type="number"
                  value={updateData.price}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, price: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Quantity</label>
                <input
                  type="number"
                  value={updateData.quantity}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, quantity: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
              >
                Update Food
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFoods;
