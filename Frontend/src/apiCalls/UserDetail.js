import axios from 'axios'
import { toast } from 'react-toastify';

// Set basic configuration
const API_BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// ----------------------------------- Sign Up API Call Logic ----------------------------------- \\
const getUserDetail = async (name, email, password, confirmPassword) => {
    try {
        // Call sign up api
        const response = await axios.get(`${API_BASE}/api/user/getuser`,
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

            return (e.response.data);
        }
        else {
            console.error(e.message)
            return (e.message);
        }
    }
}
// ----------------------------------- ******************************* ----------------------------------- \\

export { getUserDetail };