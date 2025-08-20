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

        console.log("Req body", req.body);
        console.log("Req files", req.files);

        // Store images to cloud using cloudinary api
        const image1 = await uploadOnCloudinary(req.files.image1[0].path, req.body.category, req.body.subCategory)
        const image2 = await uploadOnCloudinary(req.files.image2[0].path, req.body.category, req.body.subCategory)
        const image3 = await uploadOnCloudinary(req.files.image3[0].path, req.body.category, req.body.subCategory)
        const image4 = await uploadOnCloudinary(req.files.image4[0].path, req.body.category, req.body.subCategory)

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
const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;

        // Check params fetch
        if (!productId) {
            throw new Error("Product id not found fromo request.");
        }

        // Delete product from database
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // Check product deleted
        if (!deletedProduct) {
            throw new Error("Product deletion failed.")
        }

        res.status(200).json({
            success: true, 
            message: "Product deleted",
            product: deletedProduct
        })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }

}
// --------------------------- *************** --------------------------- \\

// --------------------------- Get All Product ---------------------------  \\
const getAllProducts = async (req, res) => {
    try {
        // Get product details from database
        const allProducts = await Product.find({});

        // Check all products fethed
        if (!allProducts) {
            throw new Error("Failed to fetch all products")
        }

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Fetched all products",
            products: allProducts
        });
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}
// --------------------------- *************** --------------------------- \\

export { addProduct, getAllProducts, deleteProduct };