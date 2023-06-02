const { body } = require("express-validator");

const loginValidator = () => [
  body("email")
    .isEmail()
    .withMessage("email is not Valid")
    .exists()
    .withMessage("this field is required"),
  body("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("wrong format for password(6-16)")
    .exists()
    .withMessage("this field is required"),
  // body("password"),
];
const signupValidator = () => [
  body("fullName")
    .isLength({ min: 6, max: 16 })
    .withMessage("wrong format for name(6-35)")
    .exists()
    .withMessage("this field is required"),
  body("age")
    .isNumeric()
    .withMessage("age must be number")
    .exists()
    .withMessage("this field is required"),
  body("mobile")
    .isMobilePhone("fa-IR")
    .withMessage("number must be from iran")
    .exists()
    .withMessage("this field is required"),
  body("email")
    .isEmail()
    .withMessage("email is not Valid")
    .exists()
    .withMessage("this field is required"),
  body("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("wrong format for password(6-16)")
    .exists()
    .withMessage("this field is required"),
];
module.exports = { loginValidator, signupValidator };
