import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "@/components/layouts/RootLayout";
import { paths } from "@/constants/paths";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Menu from "@/pages/Menu";
import Users from "@/pages/Users";

const router = createBrowserRouter([
  {
    path: paths.MENU,
    element: <Menu />,
  },
  {
    path: paths.HOME,
    element: <RootLayout />,
    children: [
      {
        path: paths.HOME,
        element: <Home />,
      },
      {
        path: paths.USERS,
        element: <Users />,
      },
      {
        path: paths.LOGIN,
        element: <Login />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
