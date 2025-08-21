import express from 'express'
import { addProduct, deleteProduct, getAllProducts } from '../controllers/ProductController.js';
import upload from '../middlewares/multer.js';
import verifyAdminUser from '../middlewares/verifyAdminUser.js';
import { addProductValidations,  productImagesValidations } from '../validations/ProductValidations.js';

const router = express.Router();

// ------------------------------------ Add product ------------------------------------ \\
router.post("/add", verifyAdminUser, upload.fields([{name: "image1", maxCount: 1},
                {name: "image2", maxCount: 1},
                {name: "image3", maxCount: 1},
                {name: "image4", maxCount: 1}
            ]), addProductValidations, productImagesValidations, addProduct);
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Update product ------------------------------------ \\

// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Delete product ------------------------------------ \\
router.post("/delete", verifyAdminUser, deleteProduct)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Get All Products ------------------------------------ \\
router.get("/allproducts", verifyAdminUser, getAllProducts);
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Get product details ------------------------------------ \\

// ------------------------------------ ************ ------------------------------------ \\

export {router};