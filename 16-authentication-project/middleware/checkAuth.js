const userModel = require("../model/user.model");
const { verifyToken } = require("../utils/auth.util");
const checkAuth = async (req, res, next) => {
  try {
    const bearerToken = req?.headers?.authorization;

    const [bearer, token] = bearerToken?.split(" ");
    if (bearer && bearer.toLowerCase() === "bearer" && token) {
      console.log(token);
      const verifiedToken = verifyToken(token);
      const user = await userModel.findOne({
        email: verifiedToken.email,
      });

      req.isAuthorized = !!user;
      if (!user) throw { statusCode: 404, message: "user not found" };
      req.user = { email: user.email, fullName: user.fullName };
      next();
    } else {
      throw { statusCode: 401, message: "Please login again" };
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { checkAuth };
