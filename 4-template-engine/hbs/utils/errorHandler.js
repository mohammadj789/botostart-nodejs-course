const NotFoundError = (req, res, next) => {
  return res.status(404).send({
    statusCode: res.statusCode,
    error: {
      type: "NotFound",
      message: `${req.url} is not a valid route`,
    },
  });
};
const ErrorHandler = (err, req, res, next) => {
  return res.send({
    statusCode: err.status || 500,
    error: {
      message: err.message || "InternalServerError",
    },
  });
};
module.exports = { NotFoundError, ErrorHandler };
