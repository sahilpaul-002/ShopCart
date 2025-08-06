import express from 'express'
import { registerValidation, loginValidations } from '../validations/UserValidations.js'
import { registerUser } from '../controllers/AuthController.js';

const router = express.Router();

// ------------------------------------ User Sign up ------------------------------------ \\
router.post('/signup',registerValidation,registerUser)
// ------------------------------------ ************ ------------------------------------ \\



export { router };