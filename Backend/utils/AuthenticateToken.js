import JWT from "jsonwebtoken";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (token) => {
    try {
        console.log(token);
        const decoded = JWT.verify(token, jwtSecretKey);
        console.log('Decoded token:', decoded);
        return true;
    } catch (err) {
        // Token is invalid or expired → reject request
        throw new Error("Token credentials invalid")
    }
}

export default authenticateToken;