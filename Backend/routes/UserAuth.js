import express from 'express'
import { registerValidation, loginValidations } from '../validations/UserValidations.js'
import { registerUser, loginUser } from '../controllers/AuthController.js';

const router = express.Router();

// ------------------------------------ User Sign up ------------------------------------ \\
router.post('/signup',registerValidation,registerUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User Log in ------------------------------------ \\
router.post('/login',loginValidations,loginUser)
// ------------------------------------ ************ ------------------------------------ \\



export { router };