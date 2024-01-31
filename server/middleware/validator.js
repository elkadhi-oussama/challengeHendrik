// Importing necessary functions from express-validator
import { check, validationResult } from "express-validator";

// Defining rules for user input validation
export const userRules = () => [
  check("email", "please enter a correct mail").isEmail(),
  check("email", "email is required").notEmpty(),
  check("name", "name is required").notEmpty(),
  check("contactNumber", "phone number is required").notEmpty(),
];

// Validation middleware function to check for validation errors
export const validation = (req, res, next) => {
  // Checking for validation errors using validationResult
  const errors = validationResult(req);

  // If there are validation errors, return a 400 Bad Request with error details
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ errors: errors.array().map((err) => ({ msg: err.msg })) });
  }

  // If no validation errors, proceed to the next middleware or route handler
  next();
};
