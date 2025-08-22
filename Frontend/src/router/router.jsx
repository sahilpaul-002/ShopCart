import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Collections from "../pages/Collections";
import Orders from "../pages/Orders";
import Product from "../pages/Product";
import Contact from "../pages/Contact";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true, 
        Component: Home 
      },
      {
        path: "auth/signup",
        Component: Signup,
      },
      {
        path: "auth/login",
        Component: Login
      },
      {
        path: "collections", 
        Component: Collections
      },
      {
        path: "orders", 
        Component: Orders
      },
      {
        path: "product", 
        Component: Product
      },
      {
        path: "contact", 
        Component: Contact
      },
      {
        path: "about", 
        Component: About
      }
    ],
  },
]);

export default router;