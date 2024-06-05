import { createBrowserRouter } from "react-router-dom";
import Start from "../pages/Start/Start";
import Login from "../pages/Start/Login";
// import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "register",
    element: <Login type="register"/>,
  },
  {
    path: "login",
    element: <Login type="login"/>,
  },
  {
    path: "/forgot_password",
    element: <Login type="forgot password"/>,
  },
]);

export default router;