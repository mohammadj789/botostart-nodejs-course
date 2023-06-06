const { Joi } = require("express-validation");

const loginValidator = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .regex(/[a-zA-z0-9]{6,20}/)
      .required(),
  }),
};
const registerValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .regex(/[a-zA-Z0-9]{6,20}/),
    confirmPassword: Joi.ref("password"),
    age: Joi.number().integer().min(18).max(70).required(),
  }),
};
module.exports = { loginValidator, registerValidation };
