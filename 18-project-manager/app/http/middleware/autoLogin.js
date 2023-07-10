const { userModel } = require("../../model/user");
const { verifyToken } = require("../../module/functions");

const checkLogin = async (req, res, next) => {
  try {
    const authError = {
      status: 401,
      message: "please login to your account",
    };
    const bearerToken = req?.headers?.authorization;

    if (!bearerToken) throw authError;

    const token = bearerToken?.split(" ")?.[1];
    if (!token) throw authError;
    const result = verifyToken(token);
    const user = await userModel.findOne(
      { username: result.username },
      { password: 0 }
    );

    if (!user) throw authError;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { checkLogin };
