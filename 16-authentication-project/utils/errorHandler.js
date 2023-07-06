const errorHandler = (err, req, res, next) => {
  return res.send({
    statusCode: err?.status ?? err?.statusCode ?? 500,
    message: err?.message ?? err?.msg ?? "serverInternalError",
  });
};
module.exports = { errorHandler };
