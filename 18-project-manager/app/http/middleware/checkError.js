const { validationResult } = require("express-validator");

const expressValidatorMapper = (req, res, next) => {
  try {
    let messages = {};
    const results = validationResult(req);
    if (results?.errors?.length > 0) {
      results.errors.forEach((err) => {
        messages[err.path] = err.msg;
      });
      throw {
        status: 400,
        success: false,
        message: messages,
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { expressValidatorMapper };
