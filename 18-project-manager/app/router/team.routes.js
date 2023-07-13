const {
  TeamController,
} = require("../http/controller/team.controller");
const { checkLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkError");
const {
  createTeamValidator,
  teamMongoIdValidator,
  inviteToTeamValidator,
  updateTeamValidator,
} = require("../http/validation/team");

const router = require("express").Router();
router.post(
  "/create",
  checkLogin,
  createTeamValidator(),
  expressValidatorMapper,
  TeamController.createTeam
);
router.get("/", TeamController.getListOfTeams);
router.get("/me", checkLogin, TeamController.getMyTeams);
router.get(
  "/invite/:teamId/:username",
  checkLogin,
  inviteToTeamValidator(),
  expressValidatorMapper,
  TeamController.inviteToTeam
);
router.patch(
  "/:id",
  checkLogin,
  teamMongoIdValidator(),
  updateTeamValidator(),
  expressValidatorMapper,
  TeamController.updateTeam
);
router.delete(
  "/:id",
  checkLogin,
  teamMongoIdValidator(),
  expressValidatorMapper,
  TeamController.removeTeam
);
router.get(
  "/:id",
  teamMongoIdValidator(),
  expressValidatorMapper,
  TeamController.getTeamById
);
module.exports = { teamRoutes: router };
