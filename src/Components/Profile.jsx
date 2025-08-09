import React, { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user, userUpdate } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await userUpdate(name, photoURL);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full text-center transition-colors duration-300">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl text-yellow-500 dark:text-yellow-400 font-bold mt-4">
          Name: {user?.displayName || "No Name"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Email: {user?.email || "No Email"}
        </p>

        {/* Edit Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 w-full"
        >
          <FiEdit className="text-lg" />
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Edit Profile
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
