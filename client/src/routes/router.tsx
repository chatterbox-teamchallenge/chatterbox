import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Start/Login";
import Chat from "../pages/Chat/Chat";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "forgot_password",
    element: <Login type="forgot password"/>,
  },
  {
    path: "chat",
    element: <Chat/>,
  },
]);

export default router;