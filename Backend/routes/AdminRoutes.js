import express from 'express'
import { loginValidations } from '../validations/UserValidations.js'
import { loginAdminUser } from '../controllers/AdminAuthController.js'
import { getAdminUserDetails } from '../controllers/AdminUserController.js';
import verifyAdminUser from '../middlewares/verifyAdminUser.js';

const router = express.Router();

// ------------------------------------ Admin user Log in ------------------------------------ \\
// router.post('/signup',loginValidations,registerAdminUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Admin user Log in ------------------------------------ \\
router.post('/login',loginValidations,loginAdminUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Admin user details ------------------------------------ \\
router.get('/getadminuser', verifyAdminUser, getAdminUserDetails)
// ------------------------------------ ************ ------------------------------------ \\

export {router};