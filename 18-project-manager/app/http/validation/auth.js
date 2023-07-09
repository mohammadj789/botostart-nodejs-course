const { body } = require("express-validator");
const { userModel } = require("../../model/user");
const registerValidator = () => {
  return [
    body("username").custom(async (value, ctx) => {
      if (value) {
        const usernameRegx = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegx.test(value)) {
          const user = await userModel.findOne({ username: value });
          if (user) throw "username is taken";
          return true;
        }
        throw "username format you've entered is not good";
      }
      throw "username is required";
    }),
    body("email")
      .isEmail()
      .withMessage("please enter a proper email address")
      .custom(async (value) => {
        const user = await userModel.findOne({ email: value });
        if (user) throw "your email is already registered";
        return true;
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("phone number is not right")
      .custom(async (value) => {
        const user = await userModel.findOne({ mobile: value });
        if (user) throw "your mobile is already registered";
        return true;
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password length must be between 6 and 16")
      .custom((value, ctx) => {
        if (!value) throw "password is required";
        if (value !== ctx?.req?.body?.confirm_password) {
          throw "password and confirm password does not match";
        }
        return true;
      }),
  ];
};
const loginValidator = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("username can't be empty")
      .custom(async (value, ctx) => {
        const usernameRegx = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegx.test(value)) {
          return true;
        }

        throw "username format is not right";
      }),

    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password length must be between 6 and 16"),
  ];
};
module.exports = { registerValidator, loginValidator };
