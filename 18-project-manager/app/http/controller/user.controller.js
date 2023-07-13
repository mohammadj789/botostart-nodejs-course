const { body } = require("express-validator");
const { userModel } = require("../../model/user");
const { createLinkForFiles } = require("../../module/functions");
const { teamModel } = require("../../model/team");
class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image = createLinkForFiles(
        req,
        user.profile_image
      );
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
      if (!req.file)
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
  async getAllRequests(req, res, next) {
    try {
      const userId = req.user._id;
      const requests = await userModel.aggregate([
        { $match: { _id: userId } },
        {
          $lookup: {
            from: "users",
            localField: "inviteRequests.caller",
            foreignField: "username",
            as: "inviteRequests.caller",
          },
        },
        {
          $project: {
            inviteRequests: 1,
            // "inviteRequests.caller.first_name": 1,
            // "inviteRequests.caller.last_name": 1,
            // "inviteRequests.caller.mobile": 1,
            // "inviteRequests.caller.email": 1,
          },
        },
      ]);

      return res.status(200).json({
        status: 200,
        success: true,
        requests: requests?.[0].inviteRequests || [],
      });
    } catch (error) {
      next(error);
    }
  }
  async getRequestsByStatus(req, res, next) {
    try {
      const userId = req.user._id;
      const { status } = req.params;
      const request = await userModel.aggregate([
        { $match: { _id: userId } },
        {
          $project: {
            inviteRequests: 1,
            _id: 0,
            inviteRequests: {
              $filter: {
                input: "$inviteRequests",
                as: "request",
                cond: { $eq: ["$$request.status", status] },
              },
            },
          },
        },
      ]);
      return res.status(200).json({
        status: 200,
        success: true,
        request: request?.[0]?.inviteRequests || [],
      });
    } catch (error) {
      next(error);
    }
  }

  async changeStatusRequest(req, res, next) {
    try {
      const { id: requestId, status } = req.params;
      const { user } = req;

      const request = await userModel.findOne(
        {
          _id: user._id,
          inviteRequests: {
            $elemMatch: {
              _id: requestId,
            },
          },
        },
        {
          "inviteRequests.$": 1,
        }
      );

      if (!request)
        throw {
          status: 400,
          message:
            "no inveite request were found with this specification ",
        };
      if (request?.inviteRequests?.[0]?.status !== "pending")
        throw {
          status: 400,
          message: "this request has been responsed before",
        };
      const userUpdateResult = await userModel.updateOne(
        {
          _id: user._id,
          inviteRequests: {
            $elemMatch: {
              _id: requestId,
            },
          },
        },
        {
          $set: {
            "inviteRequests.$.status": status,
          },
        }
      );
      if (userUpdateResult.matchedCount === 0)
        throw {
          status: 500,
          message:
            "something went wrong while updating request status",
        };

      if (status === "accept") {
        await teamModel.updateOne(
          { _id: request?.inviteRequests?.[0]?.teamId },
          { $addToSet: { users: user._id } }
        );
      }
      return res.status(200).json({
        status: 200,
        success: true,
        message:
          status === "accept"
            ? "wellcome to your new team"
            : "you've rejected this team",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { UserController: new UserController() };
