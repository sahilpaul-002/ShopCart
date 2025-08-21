import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs";

const uploadOnCloudinary = async (filePath, category, subCategory) => {
    // Load environment variables from .env file
    dotenv.config();
    const cloudinaryName = process.env.COULDINARY_NAME
    const cloudinaryApiKey = process.env.COULDINARY_API_KEY
    const cloudinaryApiSecret = process.env.COULDINARY_API_SECRET

    try {
        // Configuration
        cloudinary.config({
            cloud_name: cloudinaryName,
            api_key: cloudinaryApiKey,
            api_secret: cloudinaryApiSecret
        });

        // Check file exist in the re files and in the local system
        if (!filePath || !fs.existsSync(filePath)) {
            return { success: false, secure_url: null, message: "File not found" };
        }

        let uploadResult = null
        // Check if the file exist in the system
        // Upload an image
        uploadResult = await cloudinary.uploader
            .upload(
                filePath, {
                folder: `products/${category}/${subCategory}`,
                overwrite: true,
                timeout: 60000
            }
            )

        // Delete the file from the system after upload
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return { success: true, secure_url: uploadResult.secure_url };
    }
    catch (e) {
        // Delete the file from the system
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return { success: false, secure_url: null, message: e.message };
    }
}

export default uploadOnCloudinary;  