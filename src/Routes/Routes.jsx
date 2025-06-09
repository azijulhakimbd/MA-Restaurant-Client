import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import MainLayout from "../Layout/MainLayout";
import { Component } from "react";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import NotFound from "../Pages/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import AddFood from "../Pages/Dashboard/AddFood";
import AllFoods from "../Pages/AllFoods/AllFoods";
import MyFoods from "../Pages/Dashboard/MyFoods";
import Gallery from "../Pages/Gallery/Gallery";
import SingleFood from "../Pages/AllFoods/SingleFood";
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
        path: "/AddFood",
        element: (
          <PrivateRoutes>
            <AddFood></AddFood>
          </PrivateRoutes>
        ),
      },
      {
        path: "/AllFoods",
        Component: AllFoods,
      },
      {
        path: "/foods/:id",
        Component: SingleFood,
        loader:({params})=>fetch(`http://localhost:3000/foods/${params.id}`)
      },

      {
        path: "/MyFoods",
        loader: () => fetch("http://localhost:3000/foods"),
        element: (
          <PrivateRoutes>
            <MyFoods></MyFoods>
          </PrivateRoutes>
        ),
      },
      {
        path: "/Gallery",
        Component: Gallery,
      },
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
