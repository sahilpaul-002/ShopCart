import User from '../models/User.js';
// ------------------------------------ Get user detils ------------------------------------ \\
// API URL - http://localhost:5000/api/user/getuser
const getUserDetails = async (req, res) => {
    try {
        // Destructure the request body
        const userId = req.userId;

        // Check if user exist
        const user = await User.findById(userId).select("-password -__v");
        if (!user) {
            throw new Error('User does not exist');
        }

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User logged in !",
            user: user
        });
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}
// ------------------------------------ ************ ------------------------------------ \\

export {getUserDetails};