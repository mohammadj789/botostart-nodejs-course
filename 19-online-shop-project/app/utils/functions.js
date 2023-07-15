const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../model/user");
const { SECRET_KEY } = require("./Constants");

const randomNumberGenerator = () =>
  Math.round(Math.random() * 90000) + 1000;
const signAccessToken = (userId) =>
  new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);

    const payload = { moile: user.mobile, userId: user._id };

    const option = { expiresIn: "1h" };

    JWT.sign(payload, SECRET_KEY, option, (err, token) => {
      if (err) reject(createHttpError.InternalServerError());
      resolve(token);
    });
  });

module.exports = { randomNumberGenerator, signAccessToken };
