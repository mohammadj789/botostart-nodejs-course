const { validationMapper } = require("./joi-validation-mapper");

const NotFoundError = (req, res, next) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    error: {
      type: "NotFound",
      message: "not found " + req.url + " route",
    },
  });
};
const ErrorHandler = (err, req, res, next) => {
  console.log(JSON.stringify(err, null, 4));

  return res.json({
    statusCode: err.status || 500,
    error: {
      message:
        err.message?.replace(/[\"\'\\\/]*/gi, "") ||
        "internalServerError",
      invalidParams: validationMapper(err) || err.error || undefined,
    },
  });
};
module.exports = {
  NotFoundError,
  ErrorHandler,
};
