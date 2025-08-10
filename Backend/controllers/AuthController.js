import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/GenerateTokn.js';
import authenticateToken from '../utils/AuthenticateToken.js'

// ------------------------------------ User Sign up ------------------------------------ \\
// API URL - http://localhost:5000/api/auth/signup
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
        const jwtSToken = generateToken(user._id);

        // Generate signed cookie of the JWT token
        // Send JWT in a cookie
        res.cookie('sToken', jwtSToken, {
            signed: true,    // Signed cookie for encryption
            httpOnly: true,  // Prevents client-side JS from accessing the cookie
            secure: false,   // Set to true in production with HTTPS
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Respond with success message and token
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            userId: user._id
        });
    }
    catch (e) {
        // Catch validation errors
        if (e.array) {
            res.status(400).json({ success: false, message: e.array() });
        }
        else {
            // Catch other errors
            res.status(500).json({ success: false, message: e.message });
        }

    }
}
// ------------------------------------ ************ ------------------------------------ \\


// ------------------------------------ User Log in ------------------------------------ \\
//http://localhost:5000/api/auth/login
const loginUser = async (req, res) => {
    try {
        // Check for validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            validationErrors.throw();
        }

        // Check token credentials
        const sToken = req.signedCookies.sToken;
        console.log(sToken);
        const validateToken = authenticateToken(sToken);
        if (!validateToken) {
            validateToken.throw();
        }

        // Destructuring the request body
        const { email, password } = req.body

        // Check if user exist
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            throw new Error('User does not exist');
        }
        else {
            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            // If password is invalid, throw an error
            if (!isPasswordValid) {
                throw new Error("Invalid user credentials");
            }
        }

        // Generate JWT token
        const jwtLToken = generateToken(user._id);

        // Generate signed cookie of the JWT token
        // Send JWT in a cookie
        res.cookie('lToken', jwtLToken, {
            signed: true,    // Signed cookie for encryption
            httpOnly: true,  // Prevents client-side JS from accessing the cookie
            secure: false,   // Set to true in production with HTTPS
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "User log in successfull",
            user: {
                userId: user._id,
                userName: user.name,
                userEmail: user.email
            }
        })
    }
    catch (e) {
        if (e.array) {
            //Catch validation error
            res.status(400).json({ success: false, message: e.array() })
        }
        else {
            // Catch other error
            res.status(500).json({ success: false, message: e.message });
        }
    }
}
// ------------------------------------ ************ ------------------------------------ \\


// ------------------------------------ User Log in ------------------------------------ \\
//http://localhost:5000/api/auth/logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("lToken", {
            signed: true,    // Signed cookie for encryption
            httpOnly: true,  // Prevents client-side JS from accessing the cookie
            secure: false,   // Set to true in production with HTTPS
            sameSite: 'strict',
            path: "/"
        });
        res.status(200).json({success: true, message: "Logout successful"})
    }
    catch (e) {
        // Catch other error
        res.status(500).json({ success: false, message: e.message });
    }
}
// ------------------------------------ ************ ------------------------------------ \\

export { registerUser, loginUser, logoutUser };