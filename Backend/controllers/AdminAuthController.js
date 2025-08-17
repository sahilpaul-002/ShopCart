import { validationResult } from 'express-validator';
import AdminUser from '../models/AdminUser.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/GenerateTokn.js';
import dotenv from 'dotenv';


// // ------------------------------------ Admin user Sign up ------------------------------------ \\
// // API URL - http://localhost:5000/api/admin/signup
// const registerAdminUser = async (req, res) => {
//     try {
//         // Check for validation errors
//         const validationErrors = validationResult(req);
//         if (!validationErrors.isEmpty()) {
//             validationErrors.throw();
//         }

//         // Destructure user data from request body
//         const { name, email, password, confirmPassword } = req.body;

//         // Generate salt and hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create a new user object
//         const newUser = {
//             name: name,
//             email: email,
//             password: hashedPassword
//         };

//         // Save the new user to the database
//         const user = await AdminUser.create(newUser);

//         // Generate JWT token
//         const jwtSToken = generateToken(user._id);

//         // Load environment variables from .env file
//         dotenv.config();
//         const environment = process.env.NODE_ENV || "development"

//         // Generate signed cookie of the JWT token
//         // Send JWT in a cookie
//         res.cookie('sToken', jwtSToken, {
//             signed: true,    // Signed cookie for encryption
//             httpOnly: true,  // Prevents client-side JS from accessing the cookie
//             secure: environment === "production", // Set to true in production with HTTPS
//             sameSite: environment === "production" ? "none" : "lax",
//         });

//         // Respond with success message and token
//         res.status(200).json({
//             success: true,
//             message: "Admin user registered successfully",
//             userId: user._id
//         });
//     }
//     catch (e) {
//         // Catch validation errors
//         if (e.array) {
//             res.status(400).json({ success: false, message: e.array() });
//         }
//         else {
//             // Catch other errors
//             res.status(500).json({ success: false, message: e.message });
//         }

//     }
// }
// // ------------------------------------ ************ ------------------------------------ \\


// // ----------------------------------- Admin user login ----------------------------------- \\
// // http://localhost:5174/api/admin/login
// const loginAdminUser = async (req, res) => {
//     try {
//         // Check for validation errors
//         const validationErrors = validationResult(req);
//         if (!validationErrors.isEmpty()) {
//             validationErrors.throw();
//         }

//         // Destructuring the request body
//         const { email, password } = req.body

//         // Check if user exist
//         const user = await AdminUser.findOne({ email });
//         if (!user) {
//             throw new Error('User does not exist');
//         }
//         else {
//             // Compare the provided password with the stored hashed password
//             const isPasswordValid = await bcrypt.compare(password, user.password);
//             // If password is invalid, throw an error
//             if (!isPasswordValid) {
//                 throw new Error("Invalid user credentials");
//             }
//         }

//         // Generate JWT token
//         const jwtAdminLToken = generateToken(user.email);

//         // Load environment variables from .env file
//         dotenv.config();
//         const environment = process.env.NODE_ENV || "development"

//         // Generate signed cookie of the JWT token
//         // Send JWT in a cookie
//         res.cookie('adminLToken', jwtAdminLToken, {
//             signed: true,    // Signed cookie for encryption
//             httpOnly: true,  // Prevents client-side JS from accessing the cookie
//             secure: environment === "production", // Set to true in production with HTTPS
//             sameSite: environment === "production" ? "none" : "lax",
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         });

//         res.status(200).json({
//             success: true,
//             message: "Admin user log in successfull",
//             user: user
//         })
//     }
//     catch (e) {
//         if (e.array) {
//             //Catch validation error
//             res.status(400).json({ success: false, message: e.array() })
//         }
//         else {
//             // Catch other error
//             res.status(500).json({ success: false, message: e.message });
//         }
//     }
// }
// // ----------------------------------- ***************** ----------------------------------- \\

// ----------------------------------- Admin user login ----------------------------------- \\
// http://localhost:5174/api/admin/login
const loginAdminUser = async (req, res) => {
    try {
        // Check for validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            validationErrors.throw();
        }

        // Destructuring the request body
        const { email, password } = req.body

        // Load environment variables from .env file
        dotenv.config();
        const adminUsers = JSON.parse(process.env.ADMIN_USERS)

        // Check if user is authorized
        const user = adminUsers.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('User not authorized to login');
        }

        // Generate JWT token
        const jwtAdminLToken = generateToken(user.email);

        // Load environment variables from .env file
        dotenv.config();
        const environment = process.env.NODE_ENV || "development"

        // Generate signed cookie of the JWT token
        // Send JWT in a cookie
        res.cookie('adminLToken', jwtAdminLToken, {
            signed: true,    // Signed cookie for encryption
            httpOnly: true,  // Prevents client-side JS from accessing the cookie
            secure: environment === "production", // Set to true in production with HTTPS
            sameSite: environment === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Admin user log in successfull",
            user: user
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
// ----------------------------------- ***************** ----------------------------------- \\

export {loginAdminUser};