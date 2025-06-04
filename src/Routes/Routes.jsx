import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import MainLayout from "../Layout/MainLayout";
import { Component } from "react";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import NotFound from "../Pages/NotFound";
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
    ]
  },
  {
    path:'/*',
    Component:NotFound
  }
]);
