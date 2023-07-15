const Joi = require("joi");
const getOtpSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .pattern(/^09[0-9]{9}$/)

    .error(new Error("mobile you entered in not valid")),
  // mobile: Joi.string()
  //   .trim()
  //   .lowercase()
  //   .email()
  //   .required()
  //   .error(new Error("email you entered in not valid")),
  // password: Joi.string()
  //   .trim()
  //   .min(6)
  //   .max(16)
  //   .required()
  //   .error(new Error("password must be between 5 and 16 character")),
});
const checkOtpSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("mobile you entered in not valid")),

  code: Joi.string()
    .trim()
    .min(4)
    .max(6)
    .error(new Error("your code is not valid")),
});
module.exports = { getOtpSchema, checkOtpSchema };
