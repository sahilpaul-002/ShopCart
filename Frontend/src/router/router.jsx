import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true, 
        Component: Home 
      },
      // {
      //   path: "about", 
      //   Component: About
      // },
      {
        path: "auth/signup",
        Component: Signup,
      },
      {
        path: "auth/login",
        Component: Login
      }
    ],
  },
]);

export default router;