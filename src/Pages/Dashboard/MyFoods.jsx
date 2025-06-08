import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load foods added by current user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/foods?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyFoods(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading foods:", err);
          toast.error("Failed to load your foods.");
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = toast.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/foods/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.deletedCount > 0) {
        toast.success("Food deleted successfully!");
        setMyFoods((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to delete the food.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting.");
    }
  };

  const handleUpdate = (id) => {
    toast.info("Redirecting to update page...");
    navigate(`/update-food/${id}`);
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Foods</h2>

      {myFoods.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t added any foods yet.</p>
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
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleUpdate(food._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoods;
