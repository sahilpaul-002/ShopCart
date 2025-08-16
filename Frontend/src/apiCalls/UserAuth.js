import axios from 'axios'

// Set basic configuration
const API_BASE = 'http://localhost:5000';

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
        return (response.data);
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)
            return (e.response.data);
        }
        else {
            console.error(e.message)
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
        return (response.data);
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)
            return (e.response.data);
        }
        else {
            console.error(e.message)
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
        return (response.data);
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)
            return (e.response.data);
        }
        else {
            console.error(e.message)
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
        return (response.data);
    }
    catch (e) {
        if (e.response) {
            console.error(e.response.data)
            return (e.response.data);
        }
        else {
            console.error(e.message)
            return (e.message);
        }
    }

}
// ----------------------------------- ******************************* ----------------------------------- \\

export { userSignUpApi, userLogInApi, googleSignInApi, userLogOutApi }