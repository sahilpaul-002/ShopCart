import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Controller to validate registration data
const registerUsr = async (req, res) => {
    // 
    dotenv.config();
    const cookieSecretKey = process.env.COOKIE_SECRT_KEY

    try {
        // Check for validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            validationErrors.throw;
        }

        // Destructure user data from request body
        const { userName, userEmail, password, confirmPassword } = req.body;

        // // Check if password and confirmPassword match
        // if (password !== confirmPassword) {
        //     return res.status(400).json({ success: false, message: "Passwords do not match" });
        // }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = {
            name: userName,
            email: userEmail,
            password: hashedPassword
        };

        // Save the new user to the database
        const user = await User.create(newUser);

        // Generate JWT token
        const jwtToken = generateToken(user._id);

        // Generate signed cookie of the JWT token
        app.user(cookieParser(cookieSecretKey));
        res.cookie('token', jwtToken, { signed: true });
        // Send JWT in a cookie
        res.cookie('token', token, {
            httpOnly: true,  // Prevents client-side JS from accessing the cookie
            secure: false,   // Set to true in production with HTTPS
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        });

        // Respond with success message and token
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: user,
        });
    }
    catch (e) {
        // Catch validation errors
        if (e.array) {
            res.status(400).jsono({success: false, message: e.message });
        }
        else {
            // Catch other errors
            res.status(500).json({ success: false, message: e.message });
        }

    }
}