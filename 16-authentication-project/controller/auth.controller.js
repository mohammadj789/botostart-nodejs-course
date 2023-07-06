const userModel = require("../model/user.model");
const {
  hashPassword,
  comparePassword,
  signToken,
} = require("../utils/auth.util");

async function register(req, res, next) {
  try {
    const { fullName, email, password } = req.body;
    const user = await userModel.create({
      fullName,
      email,
      password: hashPassword(password),
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) throw { statusCode: 404, message: "user not found" };
    if (comparePassword(password, user.password)) {
      const token = signToken({ id: user._id, email: user.email });
      res.send({ token, message: "success" });
    } else {
      throw {
        statusCode: 400,
        message: "email or password is incorrect",
      };
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { register, login };
