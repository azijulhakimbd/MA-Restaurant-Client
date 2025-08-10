import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import NotFound from "../Pages/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import AddFood from "../Pages/Dashboard/AddFood";
import AllFoods from "../Pages/AllFoods/AllFoods";
import MyFoods from "../Pages/Dashboard/MyFoods";
import Gallery from "../Pages/Gallery/Gallery";
import FoodDetails from "../Pages/Food/FoodDetails";
import UpdateFood from "../Pages/Dashboard/UpdateFood";
import FoodPurchase from "../Pages/Food/FoodPurchase";
import MyOrders from "../Pages/Dashboard/MyOrders";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import DashboardLayout from "../Layout/DashboardLayout";

import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Dashboard/Profile";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: MainLayout,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/about-us",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },

      {
        path: "/all-foods",
        Component: AllFoods,
      },
      {
        path: "/foods/:id",
        Component: FoodDetails,
        loader: ({ params }) =>
          fetch(
            `https://restaurant-management-server-psi.vercel.app/foods/${params.id}`
          ),
      },

      {
        path: "/Gallery",
        Component: Gallery,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true, 
        element: <DashboardHome />, 
      },
      {
        path: "add-food",
        element: <AddFood />,
      },
      {
        path: "my-foods",
        loader: () =>
          fetch("https://restaurant-management-server-psi.vercel.app/foods"),
        element: <MyFoods />,
      },
      {
        path: "update-food/:id",
        loader: ({ params }) =>
          fetch(
            `https://restaurant-management-server-psi.vercel.app/foods/${params.id}`
          ),
        element: <UpdateFood />,
      },
      {
        path: "food-purchase/:id",
        loader: ({ params }) =>
          fetch(
            `https://restaurant-management-server-psi.vercel.app/foods/${params.id}`
          ),
        element: <FoodPurchase />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
