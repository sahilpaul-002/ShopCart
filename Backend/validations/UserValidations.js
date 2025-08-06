import { body } from "express-validator";
import User from "../models/User.js";s

// User name validation
const userNameValidation = () => {
    body("userName")
        .notEmpty()
        .withMessage("User name is required")
        .isLength({ min: 3 })
        .withMessage("User name must be at least 3 characters long");
}

// User email validation
const userEmailValidation = () => {
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format");
}

//User exist validation
const userExsistValidation = async(value) => {
    const user = await User.findOne({'email': value});
    if (user) {
        throw new Error("User already exists");
    }
}

// User password validation
const userPasswordValidation = () => {
    body('password')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters");
}

// Confirm password validation
const confirmPasswordValidation = (confirmPassword, req) => {
    if (confirmPassword !== req.body.password) {
        throw new Error("Passwords do not match");
    }
}

// Rgistration validation
const registerValidation = [
    userNameValidation,
    userEmailValidation.custom(userExsistValidation),
    userPasswordValidation.custom(confirmPasswordValidation)
]

// Login validation
const loginValidations = [
    userEmailValidation.custom(userExsistValidation),
    userPasswordValidation
]

export { registerValidation, loginValidations };