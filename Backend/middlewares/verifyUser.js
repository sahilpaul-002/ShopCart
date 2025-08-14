import authenticateToken from "../utils/AuthenticateToken.js"

const verifyUser = (req, res, next) => {
    try {
        // Get the login token from the request cookie
        const lToken = req.signedCookies.lToken
        if (!lToken) {
            throw new Error("Token credentials invalid");
        }
        const validateToken = authenticateToken(lToken);
        if (!validateToken.success) {
            validateToken.throw();
        }

        // Add the user id retrieved from the signed token to the api params
        console.log(validateToken);
        req.userId = validateToken.userId;
        console.log(req.userId);

        next();
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

export default verifyUser;