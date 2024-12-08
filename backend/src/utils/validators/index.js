const { check, validationResult } = require("express-validator");

exports.userSignupValidator = [
  // Name validation
  check("name", "Name is required").notEmpty(),

  // Email validation
  check("email", "Email must be between 3 and 32 characters")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must contain @")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must be a valid email address"),

  // Password validation
  check("password", "Password is required").notEmpty(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  // Validation logic for errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Log full error array for debugging
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
