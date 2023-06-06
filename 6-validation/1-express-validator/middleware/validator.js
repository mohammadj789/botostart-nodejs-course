const { validationResult } = require("express-validator");

const checkValidation = (req, res, next) => {
  const error = validationResult(req);
  if (error?.errors.length !== 0) {
    let obj = {};
    error.errors.forEach((err) => {
      obj[err.path] = err.msg;
    });
    throw { message: "Validation error", error: obj };
  }
  next();
};
module.exports = { checkValidation };
