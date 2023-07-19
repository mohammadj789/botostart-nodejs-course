const createHttpError = require("http-errors");
const { UserModel } = require("../../model/user");
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/Constants");

const verifyAccessToken = (req, res, next) => {
  const headers = req?.headers;

  const [bearer, token] = headers?.accesstoken?.split(" ") || [];

  if (token && bearer?.toLowerCase() === "bearer")
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, data) => {
      if (err) return next(createHttpError.InternalServerError());

      const { mobile } = data;
      if (!mobile) return next(createHttpError.NotFound());

      const user = await UserModel.findOne(
        { mobile },
        { password: 0, bills: 0, otp: 0 }
      );
      if (!user) return next(createHttpError.NotFound());

      req.user = user;
      return next();
    });
  else
    return next(createHttpError.Unauthorized("please login again"));
};
module.exports = { verifyAccessToken };
