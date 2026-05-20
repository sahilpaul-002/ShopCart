import axios from 'axios'

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
                const users = JSON.parse(localStorage.getItem('users'));
                // Check if the user is present
                if (users) {
                    //  Udpadet the user login status
                    users = users.map((user) => {
                        return (
                            (user.id === userId) ? { ...user, login: false } : user
                        )
                    });
                }

                // Save back to localStorage
                localStorage.setItem("users", JSON.stringify(users));
            }

            // Save back to localStorage
            localStorage.setItem("users", JSON.stringify(users));

            return (e.response.data);
        }
        else {
            console.error(e.message)
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
                const users = JSON.parse(localStorage.getItem('users'));
                // Check if the user is present
                if (users) {
                    //  Udpadet the user login status
                    users = users.map((user) => {
                        return (
                            (user.id === userId) ? { ...user, login: false } : user
                        )
                    });
                }

                // Save back to localStorage
                localStorage.setItem("users", JSON.stringify(users));
            }

            // Save back to localStorage
            localStorage.setItem("users", JSON.stringify(users));
            return (e.response.data);
        }
        else {
            console.error(e.message)
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
        debugger
        if (e.response) {
            console.error(e.response.data)

            if (e.response?.data?.message === "Token credentials invalid") {
                // localStorage.clear();

                // Get the current userId from the local storage
                const userId = localStorage.getItem('currentUserId');
                // Get the user same as user input from the local storage
                const users = JSON.parse(localStorage.getItem('users'));
                // Check if the user is present
                let updatedUsers
                if (users) {
                    //  Udpadet the user login status
                    updatedUsers = users.map((user) => { 
                        return (user.id === userId) ? { ...user, login: false } : user
                    });
                }

                // Save back to localStorage
                localStorage.setItem("users", JSON.stringify(updatedUsers));
            }

            // Save back to localStorage
            localStorage.setItem("users", JSON.stringify(users));

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