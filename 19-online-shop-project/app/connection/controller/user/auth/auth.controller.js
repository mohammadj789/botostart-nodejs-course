const { UserModel } = require("../../../../model/user");
const { ROLS } = require("../../../../utils/Constants");
const {
  randomNumberGenerator,
  signAccessToken,
  verifyRefreshToken,
  signRefreshToken,
} = require("../../../../utils/functions");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validator/user/auth.schema");
const Controller = require("../../controller");

const createHttpError = require("http-errors");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = randomNumberGenerator() + "";
      const result = await this.saveUser(mobile, code);
      if (!result)
        throw createHttpError.Unauthorized(
          "your entrance was not accomplished"
        );
      return res.status(200).send({
        status: 200,
        message: "we've sent you a message",
        code,
        mobile,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({
        mobile,
      });
      if (!user) throw createHttpError.NotFound("user not found");
      console.log(code, user.otp.code);

      if (user.otp.code !== code)
        throw createHttpError.Unauthorized(
          "you've sent a wrong code"
        );

      if (user.otp.expiresIn < new Date().getTime())
        throw createHttpError.Unauthorized("your code has exprired");
      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);
      res.status(200).json({ data: { accessToken, refreshToken } });
      res.send();
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userId = await verifyRefreshToken(refreshToken);
      const accessToken = await signAccessToken(userId);
      const newRefreshToken = await signRefreshToken(userId);
      return res.json({
        data: { accessToken, refreshToken: newRefreshToken },
      });
    } catch (error) {
      next(error);
    }
  }
  async saveUser(mobile, code) {
    const otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };

    const result = await this.CheckExistingUser(mobile);
    if (result) {
      return await this.UpdateUser(mobile, { otp });
    }

    return !!(await UserModel.create({
      mobile,
      otp,
      Role: [ROLS.USER],
    }));
  }

  async CheckExistingUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async UpdateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (
        [null, undefined, 0, "", " ", -1, NaN].includes(
          objectData[key]
        )
      )
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}
module.exports = { UserAuthController: new UserAuthController() };
