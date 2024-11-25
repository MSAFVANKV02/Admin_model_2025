import App from "@/App";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/middlewares/ProtectedRoute";
import ErrorPage from "@/Error-Page";
import LoginPage from "@/pages/auth/Login-Page";

const rootRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default rootRouter;
