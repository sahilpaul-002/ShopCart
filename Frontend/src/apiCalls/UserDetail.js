import axios from 'axios'

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
            return (e.response.data);
        }
        else {
            console.error(e.message)
            return (e.message);
        }
    }
}
// ----------------------------------- ******************************* ----------------------------------- \\

export {getUserDetail};