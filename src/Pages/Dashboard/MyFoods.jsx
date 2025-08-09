import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router"; 
import MyFoodsApi from "../../Hook/MyFoodsApi";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getFoodsByEmail } = MyFoodsApi();

  useEffect(() => {
    if (user?.email) {
      getFoodsByEmail(user.email)
        .then((res) => {
          setMyFoods(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading foods:", err);
          toast.error("Failed to load your foods.");
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen px-4 py-8 mx-auto w-11/12">
      <h2 className="text-3xl font-bold mb-6 text-center text-base-content">
        My Foods
      </h2>

      {myFoods.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          You haven’t added any foods yet.
        </p>
      ) : (
        <>
          {/* Table view for md and up */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full bg-base-100 rounded-box shadow">
              <thead className="bg-base-200 text-base-content">
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
                  <tr key={food._id} className="border-t border-base-300">
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
                      <div className="flex gap-2">
                        <Link to={`/dashboard/update-food/${food._id}`}>
                          <button className="btn btn-sm btn-info text-white">
                            Update
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for small screens */}
          <div className="md:hidden flex flex-col gap-4">
            {myFoods.map((food) => (
              <div
                key={food._id}
                className="card bg-base-100 shadow-md rounded-box p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{food.name}</h3>
                    <p className="text-sm text-base-content">
                      Price: ${food.price}
                    </p>
                    <p className="text-sm text-base-content">
                      Quantity: {food.quantity}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link to={`/dashboard/update-food/${food._id}`}>
                    <button className="btn btn-sm btn-info text-white">
                      Update
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyFoods;
