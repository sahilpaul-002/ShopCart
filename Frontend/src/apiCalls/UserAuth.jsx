import axios from 'axios'

// Set basic configuration
const API_BASE = 'http://localhost:5000';


const userSignUpApi = async (userInput) => {
    try {
        // Destructure the user input
        const { name, email, password, confirmPassword } = userInput;

        // Call sign up api
        const response = await axios.post(`${API_BASE}/api/auth/signup`, {
            name, email, password, confirmPassword
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return (response.data);
    }
    catch (e) {
        if (e.signUpResponse) {
            return (e.response.data);
        }
        else {
            return (e.message);
        }
    }

}

export { userSignUpApi }