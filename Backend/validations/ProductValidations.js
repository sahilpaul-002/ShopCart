import { body } from "express-validator";
import Product from '../models/Product.js';

// Product name validation
const productNameValidation = () => {
  return body("name")
    .notEmpty()
    .withMessage("Product name is required")
}

// Product description validation
const productDescriptionlValidation = () => {
  return body("description")
    .notEmpty()
    .withMessage("Product description is required")
}

// Product category validation
const productCategoryValidation = () => {
  return body('category')
    .notEmpty()
    .withMessage("Product category is required")
}

// Product subCategory validation
const productSubCategoryValidation = () => {
  return body('subCategory')
    .notEmpty()
    .withMessage("Product subCategory is required")
}

// Product bestseller validation
const productBestsellerValidation = () => {
  return body("bestSeller")
    .notEmpty().withMessage("Product bestseller is required")
    .isBoolean().withMessage("Product bestseller must be true/false");
}

// Product price validation
const productPriceValidation = () => {
  return body("price")
    .notEmpty().withMessage("Product price is required")
    .isNumeric().withMessage("Product price must be a number");
}

// Custom validation for images
const productImagesValidations = (req, res, next) => {
  const requiredFields = ["image1", "image2", "image3", "image4"];

  // Check if at least one image exists
  const hasAnyImage = requiredFields.some(
    field => req.files && req.files[field] && req.files[field].length > 0
  );

  if (!hasAnyImage) {
    // Manually push validation error into req
    req.validationErrors = (req.validationErrors = {
      ...(req.validationErrors || {}),
      success: false,
      message: "Validation failed",
      errors: [{
        type: "field",
        value: "",
        msg: "At least one unique image upload required",
        path: "image",
        location: "files"
      }]
    })
  }

  next();
};

//User exist validation
// const userExsistValidation = async(value) => {
//     const user = await User.findOne({'email': value});
//     if (user) {
//         throw new Error("User already exists");
//     }
//     return true;
// }

// Confirm password validation
// const confirmPasswordValidation = () => {
//   return body("confirmPassword")
//     .notEmpty().withMessage("Confirm password is required")
//     .custom((confirmPassword, { req }) => {
//       if (confirmPassword !== req.body.password) {
//         throw new Error("Passwords do not match");
//       }
//       return true;
//     });
// };

// Rgistration validation
const addProductValidations = [
  productNameValidation(),
  productDescriptionlValidation(),
  productCategoryValidation(),
  productSubCategoryValidation(),
  productBestsellerValidation(),
  productPriceValidation()
];

export { addProductValidations, productImagesValidations };