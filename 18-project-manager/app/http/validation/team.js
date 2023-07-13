const { body, param } = require("express-validator");
const { teamModel } = require("../../model/team");
const { userModel } = require("../../model/user");

const createTeamValidator = () => [
  body("username")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("name cannot be less than 3")
    .isAlphanumeric()
    .withMessage("username can only contain chars and numbers")
    .custom(async (value, ctx) => {
      const team = await teamModel.findOne({ username: value });
      if (team) throw "username is taken";
      return true;
    }),
  body("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("name cannot be less than 3"),
  body("description")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("description cannot be less than 5"),
];
const teamMongoIdValidator = () => [
  param("id").isMongoId().withMessage("invalid mongo objectID"),
];
const inviteToTeamValidator = () => [
  param("teamId").isMongoId().withMessage("invalid mongo objectID"),
];
const updateTeamValidator = () => [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("name cannot be less than 3")
    .isAlpha("en-US", { ignore: " " }),
  body("description")
    .optional()
    .isLength({ min: 5 })
    .withMessage("description cannot be less than 5")
    .isAlpha("en-US", { ignore: " " }),
];

module.exports = {
  createTeamValidator,
  teamMongoIdValidator,
  inviteToTeamValidator,
  updateTeamValidator,
};
