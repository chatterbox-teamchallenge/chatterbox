import { createBrowserRouter } from "react-router-dom";
import Start from "../pages/Start/Start";
import Login from "../pages/Start/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "register",
    element: <Login type="register" isConfirmed={false}/>,
  },
  {
    path: "confirm",
    element: <Login type="register" isConfirmed={true}/>,
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