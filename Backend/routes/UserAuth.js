import express from 'express'
import { registerValidation, loginValidations } from '../validations/UserValidations.js'
import { registerUser, loginUser, logoutUser, googleUserSignIn } from '../controllers/AuthController.js';

const router = express.Router();

// ------------------------------------ User Sign up ------------------------------------ \\
router.post('/signup',registerValidation,registerUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User Log in ------------------------------------ \\
router.post('/login',loginValidations,loginUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User Log out ------------------------------------ \\
router.get('/logout',loginValidations,logoutUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User google sign in  ------------------------------------ \\
router.post('/googlesignin', googleUserSignIn)
// ------------------------------------ ************ ------------------------------------ \\



export { router };