const { validationResult } = require("express-validator");
const {
  expressValidatorMapper,
  hashString,
  comparePassword,
  tokenGenerator,
} = require("../../module/functions");
const { userModel } = require("../../model/user");
const { json } = require("express");

class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, mobile, password } = req.body;
      const hash_password = hashString(password);
      // const user = userModel.findOne({username})
      const user = await userModel.create({
        username,
        email,
        mobile,
        password: hash_password,
      });

      return res.send(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
      if (!user)
        throw {
          status: 401,
          message: "username or password is wrong",
        };
      const checkPass = comparePassword(password, user.password);
      if (!checkPass)
        throw {
          status: 401,
          message: "username or password is wrong",
        };
      const token = tokenGenerator(username);
      user.token = token;
      await user.save();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "you are logged in",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  resetPassword() {}
}
module.exports = { AuthController: new AuthController() };
