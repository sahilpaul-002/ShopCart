import User from '../models/User.js';
// ---------------------------------- Logic to add products to cart database ---------------------------------- \\
const addToCart = async (req, res) => {
    try {
        // Destructure request bodyconst
        const { productId, productSize } = req.body

        const userData = await User.findById(req.userId);
        // Check if user exist
        if (!userData) {
            throw new Error("User does not exist");
        }

        // Initialize carData of the user
        let cartData = userData.cartData || {};

        // Logic to add product to cart
        if (cartData[productId]) {
            if (cartData[productId][productSize]) {
                // Check sie already present
                cartData[productId][productSize] += 1;
            }
            else {
                // Check size not present
                cartData[productId][productSize] = 1
            }
        }
        else {
            // Product not present in the cart
            cartData[productId] = {};
            cartData[productId][productSize] = 1
        }

        // Update the userData
        const updatedUserData = await User.findByIdAndUpdate(req.userId, { cartData });

        // check user data updated
        if (!updatedUserData) {
            throw new Error("Faled to add product to the cart")
        }

        // Success message
        return res.status(200).json({ success: true, message: "Product added to cart", user: updatedUserData });
    }
    catch (e) {
        // Error message
        return res.status(400).json({ success: false, message: e.message, user: null });

    }
}
// ----------------------------------- ******************* ----------------------------------- \\

// ---------------------------------- Logic to update user cart database ---------------------------------- \\
const updateCart = async (req, res) => {
    try {
        // Destructure request bodyconst
        const { productId, productSize, quantity } = req.body

        const userData = await User.findById(req.userId);
        // Check if user exist
        if (!userData) {
            throw new Error("User does not exist");
        }

        let cartData = await userData.cartData

        // // Update user cart data
        // cartData[productId][productSize] = quantity;
        // const updatedUserData = await User.findByIdAndUpdate(req.userId, { cartData });

        if (quantity === 0) {
            // Remove the size
            delete cartData[productId][productSize];

            // If no sizes left for that product, remove the product entirely
            if (Object.keys(cartData[productId]).length === 0) {
                delete cartData[productId];
            }
        } else {
            // Just update the quantity
            cartData[productId][productSize] = quantity;
        }

        const updatedUserData = await User.findByIdAndUpdate(
            req.userId,
            { cartData },
            { new: true } 
        );

        // Success message
        return res.status(200).json({ success: true, message: "User cart updated.", user: updatedUserData });
    }
    catch (e) {
        // Faliur message
        res.status(400).json({ success: false, message: e.message, user: null });
    }
}
// ----------------------------------- ******************* ----------------------------------- \\

// ---------------------------------- Logic to add products to cart database ---------------------------------- \\
const getUserCart = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        // Check if user exist
        if (!userData) {
            throw new Error("User does not exist");
        }

        let userCartData = await userData.cartData

        // Success message
        return res.status(200).json({ success: true, message: "Retrieved user cart", userCartData: userCartData });
    }
    catch (e) {
        // Faliur message
        res.status(400).json({ success: false, message: e.message, userCartData: null });
    }
}
// ----------------------------------- ******************* ----------------------------------- \\

export { addToCart, updateCart, getUserCart }