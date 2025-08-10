import express from 'express'
import { registerValidation, loginValidations } from '../validations/UserValidations.js'
import { registerUser, loginUser, logoutUser } from '../controllers/AuthController.js';

const router = express.Router();

// ------------------------------------ User Sign up ------------------------------------ \\
router.post('/signup',registerValidation,registerUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User Log in ------------------------------------ \\
router.post('/login',loginValidations,loginUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User Log out ------------------------------------ \\
router.post('/logout',loginValidations,logoutUser)
// ------------------------------------ ************ ------------------------------------ \\



export { router };