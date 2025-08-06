import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/GenerateTokn.js';

// ------------------------------------ User Sign up ------------------------------------ \\
const registerUser = async (req, res) => {
    try {
        // Check for validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            validationErrors.throw();
        }

        // Destructure user data from request body
        const { name, email, password, confirmPassword } = req.body;

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        };
        console.log(newUser)

        // Save the new user to the database
        const user = await User.create(newUser);

        // Generate JWT token
        const jwtToken = generateToken(user._id);

        // Generate signed cookie of the JWT token
        // Send JWT in a cookie
        res.cookie('token', jwtToken, {
            signed: true,    // Signed cookie for encryption
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
            res.status(400).json({success: false, message: e.array() });
        }
        else {
            // Catch other errors
            res.status(500).json({ success: false, message: e.message });
        }

    }
}
// ------------------------------------ ************ ------------------------------------ \\


// ------------------------------------ User Sign up ------------------------------------ \\

// ------------------------------------ ************ ------------------------------------ \\

export {registerUser};