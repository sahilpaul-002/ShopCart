import { parse } from "dotenv"
import uploadOnCloudinary from "../config/cloudinary.js"
import Product from '../models/Product.js';

// --------------------------- Add Product ---------------------------  \\
const addProduct = async (req, res) => {
    try {
        // Destructure the request body parameters
        const [name, description, price, category, subCategory, sizes, bestSeller] = req.body

        // 
        const image1 = await uploadOnCloudinary(req.FileSystem.image1[0].path)
        const image2 = await uploadOnCloudinary(req.FileSystem.image2[0].path)
        const image3 = await uploadOnCloudinary(req.FileSystem.image3[0].path)
        const image4 = await uploadOnCloudinary(req.FileSystem.image4[0].path)

        //
        const newProductData = {
            name: name,
            description: description,
            price: Number(price),
            category: category,
            subCategory: subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller,
            date: Date.now(),
            image1: image1,
            image2: image2,
            image3: image3,
            image4: image4
        }

        // Add new product to data base
        const product = Product.create(newProductData);

        return res.status(200).json({ success: true, message: "Product successfuly added", product: Product });
    }
    catch (e) {
        return res.status(400).json({success: false, message: e.message});
    }
}
// --------------------------- *************** --------------------------- \\

// --------------------------- Update Product ---------------------------  \\

// --------------------------- *************** --------------------------- \\

// --------------------------- Deletes Product ---------------------------  \\

// --------------------------- *************** --------------------------- \\

export {addProduct};