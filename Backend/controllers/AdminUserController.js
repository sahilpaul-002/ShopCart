import dotenv from 'dotenv';
// ------------------------------------ Get admin user detils ------------------------------------ \\
// API URL - http://localhost:5000/api/user/getadminuser
const getAdminUserDetails = async (req, res) => {
    try {
        // Destructure the request body
        const userEmail = req.userEmail;

        // Load environment variables from .env file
        dotenv.config();
        const adminUsers = JSON.parse(process.env.ADMIN_USERS)

        // Check if user is authorized
        const user = adminUsers.find(u => u.email === userEmail);
        if (!user) {
            throw new Error('User not authorized to login');
        }

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User login authorized !",
            user: user
        });
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}
// ------------------------------------ ************ ------------------------------------ \\

export { getAdminUserDetails };