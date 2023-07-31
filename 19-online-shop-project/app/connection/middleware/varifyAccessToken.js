const createHttpError = require("http-errors");
const { UserModel } = require("../../model/user");
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/Constants");

const getToken = (headers) => {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && bearer?.toLowerCase() === "bearer") return token;
  throw createHttpError.Unauthorized("please login again");
};

const verifyAccessToken = (req, res, next) => {
  try {
    const token = getToken(req?.headers);
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, data) => {
      try {
        if (err)
          throw createHttpError.InternalServerError(err.message);

        const { mobile } = data;
        if (!mobile) throw createHttpError.NotFound();

        const user = await UserModel.findOne(
          { mobile },
          { password: 0, bills: 0, otp: 0 }
        );
        if (!user) throw createHttpError.NotFound();

        req.user = user;
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};
const checkRole = (role) => (req, res, next) => {
  try {
    const user = req?.user;
    if (user?.Role?.includes(role)) return next();
    throw createHttpError.Forbidden(
      "you are not allowed in this route"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = { verifyAccessToken, checkRole };
