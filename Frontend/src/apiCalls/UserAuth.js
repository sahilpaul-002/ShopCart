import axios from 'axios'
import { toast } from 'react-toastify';

// Set basic configuration
const API_BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// ----------------------------------- Sign Up API Call Logic ----------------------------------- \\
const userSignUpApi = async (userInput) => {
    try {
        // Destructure the user input
        const { name, email, password, confirmPassword } = userInput;

        // Call sign up api
        const response = await axios.post(`${API_BASE}/api/auth/signup`,
            {
                name, email, password, confirmPassword
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            },
        )
        if (!response.data?.success) {
            toast.error("Sign up service is facing issue. Please try again later.");
        }
        else {
            toast.success("Sign up successful. Please log in to continue.");
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return response.data;
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)

            const message = e.response?.data?.message;
            if (
                Array.isArray(message)
            ) {
                if (message.some((err) => err.msg === "Invalid email format")) {
                    toast.error("Email format incorrect. Please try again.");
                }
                else if (message.some((err) => err.msg === "Passwords do not match")) {
                    toast.error("Passwords do not match. Please try again.");
                }
                else if (message.some((err) => err.msg === "User already exists")) {
                    toast.error("User already exists. Please log in to continue.");
                }
                else {
                    toast.error("Sign up service is facing issue. Please try again later.");
                }
            }
            else {
                toast.error("Sign up service is facing issue. Please try again later.");
            }

            return (e.response.data);
        }
        else {
            console.error(e.message)
            toast.error("Sign up service is facing issue. Please try again later.");
            return (e.message);
        }
    }

}
// ----------------------------------- ******************************* ----------------------------------- \\


// ----------------------------------- Log In  API Call Logic ----------------------------------- \\
const userLogInApi = async (userInput) => {
    try {
        // Destructure the user input
        const { email, password } = userInput;

        // Call sign up api
        const response = await axios.post(`${API_BASE}/api/auth/login`, {
            email, password
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
        if (!response.data?.success) {
            toast.error("Login service failed. Please try again later.");
        }
        else {
            toast.success("Login successful. Redirecting to home page...");
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return response.data;
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)

            const message = e.response?.data?.message;
            if (
                Array.isArray(message)
            ) {
                if (message.some((err) => err.msg === "Invalid email format")) {
                    toast.error("Email format incorrect. Please try again.");
                }
                else {
                    toast.error("Login service is facing issue. Please try again later.");
                }
            }
            if (message === "User does not exist") {
                toast.error("User does not exist. Please sign up first.");
            }
            else if (message === "Invalid user credentials") {
                toast.error("Invalid user credentials. Please try again.");
            }
            else {
                toast.error("Login service is facing issue. Please try again later.");
            }

            return (e.response.data);
        }
        else {
            console.error(e.message)
            toast.error("Login service is facing issue. Please try again later.");
            return (e.message);
        }
    }

}
// ----------------------------------- ******************************* ----------------------------------- \\


// ----------------------------------- Log Out  API Call Logic ----------------------------------- \\
const userLogOutApi = async () => {
    try {

        // Call sign up api
        const response = await axios.get(`${API_BASE}/api/auth/logout`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
        if (!response.data?.success) {
            toast.error("Logout service failed. Please try again later.");
        }
        else {
            toast.success("Logout successful.");
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));

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
            toast.error("Logout service is facing issue. Please try again later.");
            return (e.response.data);
        }
        else {
            console.error(e.message)
            toast.error("Logout service is facing issue. Please try again later.");
            return (e.message);
        }
    }

}
// ----------------------------------- ******************************* ----------------------------------- \\


// ----------------------------------- Google sign in API Call Logic ----------------------------------- \\
const googleSignInApi = async (userInput) => {
    try {
        // Destructure the user input
        const { name, email, password } = userInput;

        // Call sign up api
        const response = await axios.post(`${API_BASE}/api/auth/googlesignin`, {
            name, email, password
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
        if (!response.data?.success) {
            toast.error("Google sign in service is facing issue. Please try again later.");
        }
        else {
            toast.success("Google sign in successful. Redirecting to home page ...");
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return response.data;
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)
            toast.error("Google sign in service is facing issue. Please try again later.");
            return (e.response.data);
        }
        else {
            console.error(e.message)
            toast.error("Google sign in service is facing issue. Please try again later.");
            return (e.message);
        }
    }

}
// ----------------------------------- ******************************* ----------------------------------- \\

export { userSignUpApi, userLogInApi, googleSignInApi, userLogOutApi }