import axios from 'axios'

// Set basic configuration
const API_BASE = 'http://localhost:5000';

// ----------------------------------- Add product details API Call Logic ----------------------------------- \\
const addProductDetails = async (productDetails) => {
    try {
        const formData = new FormData();

        // append text fields
        formData.append("name", productDetails.name);
        formData.append("description", productDetails.description);
        formData.append("price", productDetails.price);
        formData.append("category", productDetails.category);
        formData.append("subCategory", productDetails.subCategory);
        formData.append("sizes", JSON.stringify(productDetails.sizes)); // must stringify array
        formData.append("bestSeller", productDetails.bestSeller);

        // append images only if they exist
        if (productDetails.image1) formData.append("image1", productDetails.image1);
        if (productDetails.image2) formData.append("image2", productDetails.image2);
        if (productDetails.image3) formData.append("image3", productDetails.image3);
        if (productDetails.image4) formData.append("image4", productDetails.image4);

        // Test the formData
        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }

        // Call sign up api
        const response = await axios.post(`${API_BASE}/api/admin/product/add`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
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

// ----------------------------------- Get all products API Call Logic ----------------------------------- \\
const getAllProducts = async (productDetails) => {
    try {

        // Call sign up api
        const response = await axios.get(`${API_BASE}/api/admin/product/allproducts`,
            {
                headers: {
                    "Content-Type": "application/json"
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

export { addProductDetails, getAllProducts };