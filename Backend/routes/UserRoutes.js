import express from 'express';
import verifyUser from '../middlewares/verifyUser.js';
import {getUserDetails} from '../controllers/UserControler.js'

const router = express.Router();

// ------------------------------------ User login verfication ------------------------------------ \\
router.get('/getuser', verifyUser, getUserDetails)
// ------------------------------------ ************ ------------------------------------ \\

export {router};