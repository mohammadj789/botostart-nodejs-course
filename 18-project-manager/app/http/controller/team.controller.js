const { teamModel } = require("../../model/team");
const { userModel } = require("../../model/user");

class TeamController {
  async createTeam(req, res, next) {
    try {
      const { name, description, username } = req.body;
      const owner = req.user._id;
      const team = await teamModel.create({
        name,
        description,
        owner,
        username,
      });
      if (!team)
        throw {
          status: 500,
          message: "something went wrong while creating your team",
        };
      return res.status(201).send({
        status: 201,
        success: true,
        message: "team was created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfTeams(req, res, next) {
    try {
      const teams = await teamModel.find({});
      if (!teams)
        throw {
          status: 404,
          message: "there was no team found",
        };
      return res.status(200).send({
        status: 201,
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamById(req, res, next) {
    try {
      const { id } = req.params;
      const team = await teamModel.findById(id);
      if (!team)
        throw {
          status: 404,
          message: "there was no team found",
        };
      return res.status(200).send({
        status: 200,
        success: true,
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyTeams(req, res, next) {
    try {
      const { _id: userId } = req.user;

      const teams = await teamModel.aggregate([
        {
          $match: { $or: [{ owner: userId }, { users: userId }] },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "users",
            foreignField: "_id",
            as: "users",
          },
        },
        {
          $project: {
            "owner.inviteRequests": 0,
            "owner.team": 0,
            "owner.token": 0,
            "owner.password": 0,
            "owner.createdAt": 0,
            "owner.updatedAt": 0,
            "owner.rols": 0,
            "users.inviteRequests": 0,
            "users.rols": 0,
            "users.team": 0,
            "users.token": 0,
            "users.password": 0,
            "users.createdAt": 0,
            "users.updatedAt": 0,
          },
        },
        { $unwind: "$owner" },
      ]);
      if (!teams)
        throw {
          status: 404,
          message: "there was no team fo you",
        };
      return res.status(200).send({
        status: 200,
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeTeam(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const { id } = req.params;
      const team = await teamModel.findOne({
        owner,
        _id: id,
      });
      if (!team)
        throw {
          status: 404,
          message: "there was no team found",
        };
      const deleteResult = await teamModel.deleteOne({
        _id: id,
      });
      if (deleteResult.deletedCount === 0)
        throw {
          status: 500,
          message:
            "there was something wrong while deleting your team",
        };
      return res.status(200).send({
        status: 200,
        success: true,
        message: "your team was deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async inviteToTeam(req, res, next) {
    try {
      const owner = req.user;
      const { username, teamId } = req.params;

      //check for valid team
      const team = await teamModel.findOne({
        $and: [{ owner: owner._id }, { _id: teamId }],
      });
      if (!team)
        throw {
          status: 404,
          message: "no team were found ",
        };

      //check for valid user
      const newMember = await userModel.findOne({ username });
      if (!newMember)
        throw {
          status: 404,
          message:
            "the user you are trying to invite does not exist ",
        };

      if (
        newMember?.inviteRequests.findIndex(
          (inv) => inv.teamId.toString() === teamId
        ) !== -1
      )
        throw {
          status: 404,
          message: "you have already invited this user ",
        };

      //check if user is allready in team or not
      const allreadyInvited = await teamModel.findOne({
        $and: [
          {
            $or: [{ owner: newMember._id }, { users: newMember._id }],
          },
          { _id: teamId },
        ],
      });
      if (allreadyInvited)
        throw {
          status: 400,
          message: "user is already in team",
        };

      const request = {
        teamId: team._id,
        caller: owner.username,
      };

      const updateUserResult = await userModel.updateOne(
        {
          username,
        },
        { $push: { inviteRequests: request } }
      );
      if (updateUserResult.modifiedCount === 0)
        throw {
          status: 500,
          message: "something went wrong while sending invite",
        };
      res.status(200).json({
        status: 200,
        success: true,
        message: "user invited successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateTeam(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const { id } = req.params;
      const { name, description } = req.body;
      if (!name && !description)
        throw {
          status: 404,
          message: "please select apropery to update",
        };

      const team = await teamModel.findOne({
        owner,
        _id: id,
      });
      if (!team)
        throw {
          status: 404,
          message: "there was no team found",
        };
      const updateResult = await teamModel.updateOne(
        {
          _id: id,
        },
        { $set: { name, description } }
      );
      if (updateResult.modifiedCount === 0)
        throw {
          status: 500,
          message:
            "there was something wrong while updating your team",
        };
      return res.status(200).send({
        status: 200,
        success: true,
        message: "your team updated succefully",
      });
    } catch (error) {
      next(error);
    }
  }
  removeUserFromTeam() {}
}
module.exports = { TeamController: new TeamController() };
