const notFoundError = (req, res, next) => {
  return res.send({
    statusCode: 404,
    message: "The url you are trying to access is not valid",
  });
};
module.exports = { notFoundError };
