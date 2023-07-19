const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../model/user");
const {
  ACCESS_TOKEN_SECRET_KEY,

  REFRESH_TOKEN_SECRET_KEY,
} = require("./Constants");
const redisClient = require("../utils/init_redis");
const randomNumberGenerator = () =>
  Math.round(Math.random() * 90000) + 1000;
const signAccessToken = (userId) =>
  new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);

    const payload = { mobile: user.mobile };

    const option = { expiresIn: "1h" };

    JWT.sign(
      payload,
      ACCESS_TOKEN_SECRET_KEY,
      option,
      (err, token) => {
        if (err) reject(createHttpError.InternalServerError());
        resolve(token);
      }
    );
  });
const signRefreshToken = (userId) =>
  new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);

    const payload = { mobile: user.mobile };

    const option = { expiresIn: "1y" };

    JWT.sign(
      payload,
      REFRESH_TOKEN_SECRET_KEY,
      option,
      async (err, token) => {
        if (err) reject(createHttpError.InternalServerError());

        await redisClient.SETEX(userId.toString(), 31536000, token);
        resolve(token);
      }
    );
  });

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) =>
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, data) => {
      if (err) reject(createHttpError.InternalServerError());

      const { mobile } = data;
      if (!mobile) reject(createHttpError.NotFound());

      const user = await UserModel.findOne(
        { mobile },
        { password: 0, bills: 0, otp: 0 }
      );
      if (!user) reject(createHttpError.NotFound());

      const redisToken = await redisClient.get(user._id.toString());
      if (!redisToken || redisToken !== token)
        reject(createHttpError.Unauthorized("please login again"));

      resolve(user._id);
    })
  );
};

module.exports = {
  randomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
