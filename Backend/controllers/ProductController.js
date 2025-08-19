import { validationResult } from 'express-validator';
import uploadOnCloudinary from "../config/cloudinary.js"
import Product from '../models/Product.js';

// --------------------------- Add Product ---------------------------  \\
const addProduct = async (req, res) => {
    try {
        // Check for validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            validationErrors.throw();
        }
        // Destructure the request body parameters
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body

        // Store images to cloud using cloudinary api
        const image1 = await uploadOnCloudinary(req.files.image1[0].path)
        const image2 = await uploadOnCloudinary(req.files.image2[0].path)
        const image3 = await uploadOnCloudinary(req.files.image3[0].path)
        const image4 = await uploadOnCloudinary(req.files.image4[0].path)
        
        // Testing
        // const image1 = req.files?.image1 ? req.files.image1[0].filename : null;
        // const image2 = req.files?.image2 ? req.files.image2[0].filename : null;
        // const image3 = req.files?.image3 ? req.files.image3[0].filename : null;
        // const image4 = req.files?.image4 ? req.files.image4[0].filename : null;

        // Create the new product structure
        const newProductData = {
            name: name,
            description: description,
            price: Number(price),
            category: category,
            subCategory: subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller,
            date: Date.now(),
            image1: image1,     // Store the secure_url from the cloudinary response
            image2: image2,     // Store the secure_url from the cloudinary response
            image3: image3,     // Store the secure_url from the cloudinary response
            image4: image4      // Store the secure_url from the cloudinary response
        }

        // Add new product to data base
        const product = await Product.create(newProductData);

        return res.status(200).json({ success: true, message: "Product successfuly added", product: product });
    }
    catch (e) {
        // Catch validation errors
        if (e.array) {
            res.status(400).json({ success: false, message: e.array() });
        }
        else {
            // Catch other errors
            res.status(500).json({ success: false, message: e.message });
        }
    }
}
// --------------------------- *************** --------------------------- \\

// --------------------------- Update Product ---------------------------  \\

// --------------------------- *************** --------------------------- \\

// --------------------------- Deletes Product ---------------------------  \\

// --------------------------- *************** --------------------------- \\

export { addProduct };