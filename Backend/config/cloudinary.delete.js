import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs";

const deleteFromCloudinary = async (publicId) => {
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
        if (!publicId) {
            return { success: false, secure_url: null, message: "Public-id not found" };
        }

        const destroyedFile = await cloudinary.uploader.destroy(publicId);

        return { success: true, message: "File deletion successful", deletedFile: destroyedFile };
    }
    catch (e) {
        return { success: false, message: e.message, deletedFile: null };
    }
}

export default deleteFromCloudinary;  