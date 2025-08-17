import express from 'express'
import { registerValidation, loginValidations } from '../validations/UserValidations.js'
import { registerUser, loginUser, logoutUser, googleUserSignIn } from '../controllers/AuthController.js';
import verifyUser from '../middlewares/verifyUser.js';

const router = express.Router();

// ------------------------------------ User Sign up ------------------------------------ \\
router.post('/signup',registerValidation,registerUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User Log in ------------------------------------ \\
router.post('/login',loginValidations,loginUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User google sign in  ------------------------------------ \\
router.post('/googlesignin', googleUserSignIn)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ User Log out ------------------------------------ \\
router.get('/logout',verifyUser,logoutUser)
// ------------------------------------ ************ ------------------------------------ \\



export { router };