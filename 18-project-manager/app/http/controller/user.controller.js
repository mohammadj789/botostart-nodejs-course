const { body } = require("express-validator");
const { userModel } = require("../../model/user");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        user.profile_image;
      return res
        .status(200)
        .json({ status: 200, success: true, user });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      let data = { ...req.body };
      const userId = req.user._id;
      const fields = ["first_name", "last_name", "skils"];

      Object.keys(data).forEach((key) => {
        if (!fields.includes(key)) delete data[key];
      });
      // Object.entries(data).forEach(([key, value]) => {
      //   if (!fields.includes(key) || badValues.includes(value))
      //     delete data[key];
      // });

      const result = await userModel.updateOne(
        { _id: userId },
        { $set: data }
      );
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "profile updated successfully",
        });
      }
      throw {
        status: 400,
        message: "somthing is wrong in your update request",
      };
    } catch (error) {
      next(error);
    }
  }
  async uploadProfileImage(req, res, next) {
    try {
      const userId = req.user._id;
      if (Object.keys(req.file).length == 0)
        throw {
          status: 400,
          message: "please select a file to upload",
        };
      const filePath = req?.file?.path
        .replace(/\\/g, "/")
        .substring(7);
      const result = await userModel.updateOne(
        { _id: userId },
        { $set: { profile_image: filePath } }
      );
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "profile image updated successfully",
        });
      }
      throw {
        status: 400,
        message: "somthing is wrong in your update request",
      };
    } catch (error) {
      next(error);
    }
  }
  addSkills() {}
  editSkill() {}
  acceptInviteTeam() {}
  rejectInviteTeam() {}
}
module.exports = { UserController: new UserController() };
