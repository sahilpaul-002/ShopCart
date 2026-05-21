import axios from 'axios'
import { toast } from 'react-toastify';

// Set basic configuration
const API_BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// ----------------------------------- Add to cart API Call Logic ----------------------------------- \\
const addProductToCart = async (productId, productSize) => {
    try {
        const response = await axios.post(`${API_BASE}/api/cart/add`,
            { productId, productSize },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            },
        )
        if (!response.data?.success) {
            toast.error("Add to cart service is facing issue. Please try again later.");
        }
        else {
            toast.success("Product added to cart successfully!");
        }
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        return response.data;

    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)

            if (e.response?.data?.message === "Token credentials invalid") {
                // localStorage.clear();

                // Get the current userId from the local storage
                const userId = localStorage.getItem('currentUserId');
                // Get the user same as user input from the local storage
                const storedUsers = localStorage.getItem("users");

                let users = [];

                if (
                    storedUsers &&
                    storedUsers !== "undefined" &&
                    storedUsers !== "null"
                ) {
                    try {
                        users = JSON.parse(storedUsers);

                        // Extra safety check
                        if (!Array.isArray(users)) {
                            users = [];
                        }

                    } catch (error) {
                        users = [];
                    }
                }
                // Check if the user is present
                if (users.length > 0 && userId) {
                    //  Udpadet the user login status
                    users = users.map((user) => {
                        return (
                            (user.id === userId) ? { ...user, login: false } : user
                        )
                    });
                }

                // Save back to localStorage
                if (users.length > 0) {
                    localStorage.setItem(
                        "users",
                        JSON.stringify(users)
                    );
                } else {
                    localStorage.removeItem("users");
                }
            }

            toast.error("Add to cart service is facing issue. Please try again later.");
            return (e.response.data);
        }
        else {
            console.error(e.message)
            toast.error("Add to cart service is facing issue. Please try again later.");
            return (e.message);
        }
    }
}
// ----------------------------------- ******************************* ----------------------------------- \\

// ----------------------------------- Update cart API Call Logic ----------------------------------- \\
const updateCartProducts = async (productId, productSize, quantity) => {
    try {
        const response = await axios.post(`${API_BASE}/api/cart/update`,
            { productId, productSize, quantity },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            },
        )
        if (!response.data?.success) {
            toast.error("Update cart service is facing issue. Please try again later.");
        }
        else {
            toast.success("Product updated in cart successfully!");
        }
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        return response.data;
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)

            if (e.response?.data?.message === "Token credentials invalid") {
                // localStorage.clear();

                // Get the current userId from the local storage
                const userId = localStorage.getItem('currentUserId');
                // Get the user same as user input from the local storage
                const storedUsers = localStorage.getItem("users");

                let users = [];

                if (
                    storedUsers &&
                    storedUsers !== "undefined" &&
                    storedUsers !== "null"
                ) {
                    try {
                        users = JSON.parse(storedUsers);

                        // Extra safety check
                        if (!Array.isArray(users)) {
                            users = [];
                        }

                    } catch (error) {
                        users = [];
                    }
                }
                // Check if the user is present
                if (users.length > 0 && userId) {
                    //  Udpadet the user login status
                    users = users.map((user) => {
                        return (
                            (user.id === userId) ? { ...user, login: false } : user
                        )
                    });
                }

                // Save back to localStorage
                if (users.length > 0) {
                    localStorage.setItem(
                        "users",
                        JSON.stringify(users)
                    );
                } else {
                    localStorage.removeItem("users");
                }
            }

            toast.error("Update cart service is facing issue. Please try again later.");
            return (e.response.data);
        }
        else {
            console.error(e.message)
            toast.error("Update cart service is facing issue. Please try again later.");
            return (e.message);
        }
    }
}
// ----------------------------------- ******************************* ----------------------------------- \\

// ----------------------------------- Add to cart API Call Logic ----------------------------------- \\
const getUserCartProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/cart/get`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            },
        )
        return (response.data);
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)

            if (e.response?.data?.message === "Token credentials invalid") {
                // localStorage.clear();

                // Get the current userId from the local storage
                const userId = localStorage.getItem('currentUserId');
                // Get the user same as user input from the local storage
                const storedUsers = localStorage.getItem("users");

                let users = [];

                if (
                    storedUsers &&
                    storedUsers !== "undefined" &&
                    storedUsers !== "null"
                ) {
                    try {
                        users = JSON.parse(storedUsers);

                        // Extra safety check
                        if (!Array.isArray(users)) {
                            users = [];
                        }

                    } catch (error) {
                        users = [];
                    }
                }
                // Check if the user is present
                if (users.length > 0 && userId) {
                    //  Udpadet the user login status
                    users = users.map((user) =>
                        user.id === userId
                            ? { ...user, login: false }
                            : user
                    );
                }

                // Save back to localStorage
                if (users.length > 0) {
                    localStorage.setItem(
                        "users",
                        JSON.stringify(users)
                    );
                } else {
                    localStorage.removeItem("users");
                }
            }

            return (e.response.data);
        }
        else {
            console.error(e.message)
            return (e.message);
        }
    }
}
// ----------------------------------- ******************************* ----------------------------------- \\

export { addProductToCart, updateCartProducts, getUserCartProducts };