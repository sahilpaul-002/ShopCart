import express from 'express';
import verifyUser from '../middlewares/verifyUser.js';
import {addToCart, updateCart, getUserCart} from '../controllers/CartController.js';

const router = express.Router();

// ------------------------------ Route to add produts to user cart ------------------------------ \\
router.post('/add', verifyUser, addToCart)
// ------------------------------ ************************** ------------------------------ \\

// ------------------------------ Route to update  user cart ------------------------------ \\
router.post('/update', verifyUser, updateCart)
// ------------------------------ ************************** ------------------------------ \\

// ------------------------------ Route to get user cart ------------------------------ \\
router.get('/get', verifyUser, getUserCart)
// ------------------------------ ************************** ------------------------------ \\

export {router};