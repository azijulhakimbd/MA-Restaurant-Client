import React, { use } from "react";

import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const UserProfile = () => {
  const { user } = use(AuthContext);
  console.log(user);

  return (
    <div className="dropdown dropdown-end mx-2">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img alt="User Photo" src={user.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link to={"/my-foods"}>My Foods</Link>
        </li>
        <li>
          <Link to={"/add-food"}>Add food</Link>
        </li>
        <li>
          <Link to={'/my-orders'}>My Orders</Link>
        </li>
        <li><Link to={'/dashboard'}>Dashboard</Link></li>
      </ul>
    </div>
  );
};

export default UserProfile;
