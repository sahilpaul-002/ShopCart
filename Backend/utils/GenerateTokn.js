import JWT from "jsonwebtoken";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const generateToken = (userId) => {
    try {
        console.log(userId)
        // Generate a JWT token with user ID and secret key
        const jwtToken = JWT.sign({id: userId}, jwtSecretKey, {expiresIn: '7d'});
        return jwtToken;
    } catch (error) {
        // console.error("Error generating JWT token:", error);
        throw new Error("Failed to generate token");
    }
}

export default generateToken;