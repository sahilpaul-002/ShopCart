import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
    // Load environment variables from .env file
    dotenv.config();
    const cloudinaryName = process.env.COULDINARY_NAME
    const cloudinaryApiKey = process.env.COULDINARY_API_KEY
    const cloudinaryApiSecret = process.env.COULDINARY_API_SECRET
    console.log(cloudinaryName)
    console.log(cloudinaryApiKey)
    console.log(cloudinaryApiSecret)

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

        // Upload an image
        const uploadResult = await cloudinary.uploader
            .upload(
                filePath, {
                folder: "products",      // optional: organize in folder
                public_id: 'shoes',
            }
            )
            .catch((error) => {
                console.log(error);
            });

        // Delete the file fromo the system after upload
        fs.unlinkSync(filePath);

        console.log(uploadResult);
        return uploadResult.secure_url
    }
    catch (e) {
        // Delete the file fromo the system after upload
        fs.unlinkSync(filePath);
        
        console.error({ success: false, message: e.message });
        return ({ success: false, message: e.message })
    }
}

export default uploadOnCloudinary;  