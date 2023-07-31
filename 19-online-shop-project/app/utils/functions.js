const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../model/user");
const path = require("path");
const fs = require("fs");
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
      if (err)
        return reject(
          createHttpError.InternalServerError(err.message)
        );

      const mobile = data?.mobile;
      if (!mobile) return reject(createHttpError.NotFound());

      const user = await UserModel.findOne(
        { mobile },
        { password: 0, bills: 0, otp: 0 }
      );

      if (!user) return reject(createHttpError.NotFound());

      const redisToken = await redisClient.get(user?._id?.toString());
      if (!redisToken || redisToken !== token)
        reject(createHttpError.Unauthorized("please login again"));

      resolve(user._id);
    })
  );
};
const removeErrorFile = (filePath) => {
  const addr = path.join(__dirname, "..", "..", "public", filePath);
  fs.unlinkSync(addr);
};
const copyObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};
const purifyUpdateValues = (data = {}, blackList = []) => {
  const nullish = ["0", 0, null, undefined, ""];
  Object.keys(data).forEach((key) => {
    if (blackList.includes(key)) delete data[key];
    if ((typeof data[key])?.toLowerCase() === "string")
      data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((index) => index.trim());
    if (Array.isArray(data[key]) && data[key].length === 0)
      delete data[key];
    if (nullish.includes(data[key])) delete data[key];
  });
};

module.exports = {
  randomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  removeErrorFile,
  copyObject,
  purifyUpdateValues,
};
