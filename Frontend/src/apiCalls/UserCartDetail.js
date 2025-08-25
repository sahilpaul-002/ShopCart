import axios from 'axios'

// Set basic configuration
const API_BASE = 'http://localhost:5000';

// ----------------------------------- Add to cart API Call Logic ----------------------------------- \\
const addProductToCart = async (productId, productSize) => {
    try {
        const response = await axios.post(`${API_BASE}/api/cart/add`,
            {productId, productSize}, 
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

// ----------------------------------- Update cart API Call Logic ----------------------------------- \\
const updateCartProducts = async (productId, productSize, quantity) => {
    try {
        const response = await axios.post(`${API_BASE}/api/cart/update`,
            {productId, productSize, quantity}, 
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
            return (e.response.data);
        }
        else {
            console.error(e.message)
            return (e.message);
        }
    }
}
// ----------------------------------- ******************************* ----------------------------------- \\

export {addProductToCart, updateCartProducts, getUserCartProducts};