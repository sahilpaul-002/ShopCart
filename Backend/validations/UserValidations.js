import { body } from "express-validator";
import User from "../models/User.js";

// User name validation
const userNameValidation = () => {
    return body("name")
            .notEmpty()
            .withMessage("User name is required")
            .isLength({ min: 3 })
            .withMessage("User name must be at least 3 characters long");
}

// User email validation
const userEmailValidation = () => {
    return body("email")
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
    return true;
}

// User password validation
const userPasswordValidation = () => {
    return body('password')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters");
}

// Confirm password validation
const confirmPasswordValidation = () => {
  return body("confirmPassword")
    .notEmpty().withMessage("Confirm password is required")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    });
};

// Rgistration validation
const registerValidation = [
  userNameValidation(),
  userEmailValidation().custom(userExsistValidation), // format + async DB check
  userPasswordValidation(),
  confirmPasswordValidation()
];

// Login validation
const loginValidations = [
    userEmailValidation().custom(userExsistValidation),
    userPasswordValidation()
]

export { registerValidation, loginValidations };