import express from 'express'
import { loginAdminUser, logoutAdminUser } from '../controllers/AdminAuthController.js'
import { getAdminUserDetails } from '../controllers/AdminUserController.js';
import verifyAdminUser from '../middlewares/verifyAdminUser.js';
import {adminLoginValidations} from "../validations/UserValidations.js"

const router = express.Router();

// ------------------------------------ Admin user Log in ------------------------------------ \\
// router.post('/signup',loginValidations,registerAdminUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Admin user Log in ------------------------------------ \\
router.post('/login',adminLoginValidations,loginAdminUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Admin user Log in ------------------------------------ \\
router.get('/logout',verifyAdminUser,logoutAdminUser)
// ------------------------------------ ************ ------------------------------------ \\

// ------------------------------------ Admin user details ------------------------------------ \\
router.get('/getadminuser', verifyAdminUser, getAdminUserDetails)
// ------------------------------------ ************ ------------------------------------ \\

export {router};