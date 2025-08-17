import axios from 'axios'

// Set basic configuration
const API_BASE = 'http://localhost:5000';

// ----------------------------------- Get user details API Call Logic ----------------------------------- \\
const getAdminUserDetail = async () => {
    try {
        // Call sign up api
        const response = await axios.get(`${API_BASE}/api/admin/getadminuser`, 
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

export {getAdminUserDetail};