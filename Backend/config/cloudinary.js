import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs";

const uploadOnCloudinary = async (filePath, category, subCategory) => {
    // Load environment variables from .env file
    dotenv.config();
    const cloudinaryName = process.env.COULDINARY_NAME
    const cloudinaryApiKey = process.env.COULDINARY_API_KEY
    const cloudinaryApiSecret = process.env.COULDINARY_API_SECRET
    console.log(cloudinaryName)
    console.log(cloudinaryApiKey)
    console.log(cloudinaryApiSecret)
    console.log(filePath)
    console.log(category)
    console.log(subCategory)

    try {
        // Configuration
        cloudinary.config({
            cloud_name: cloudinaryName,
            api_key: cloudinaryApiKey,
            api_secret: cloudinaryApiSecret 
        });

        if (!filePath) {
            throw new Error('File not found');
        }

        // // Upload an image
        const uploadResult = await cloudinary.uploader
            .upload(
                filePath, {
                folder: `products/${category}/${subCategory}`,      // optional: organize in folder
                overwrite: true
            }
            )

        // Delete the file from the system after upload
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        console.log(uploadResult.secure_url);
        return uploadResult.secure_url
    }
    catch (e) {
        // Delete the file from the system
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        console.error({ success: false, message: e.message });
        return ({ success: false, message: e.message })
    }
}

export default uploadOnCloudinary;  