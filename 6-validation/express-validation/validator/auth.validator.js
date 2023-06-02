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
module.exports = { loginValidator };
