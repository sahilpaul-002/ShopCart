import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import List from "../pages/List";
import AddProduct from "../pages/AddProduct";

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
                path: "admin/login",
                Component: Login
            },
            {
                path: "orders",
                Component: Orders
            },
            {
                path: "itemlist",
                Component: List
            },
            {
                path: "addproduct",
                Component: AddProduct
            },
        ]
    }
]);

export default router;