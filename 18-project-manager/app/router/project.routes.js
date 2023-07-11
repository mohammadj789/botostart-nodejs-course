const {
  ProjectController,
} = require("../http/controller/project.controller");
const { checkLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkError");
const {
  createProjectValidator,
  objectIdValidator,
  updateProjectValidator,
} = require("../http/validation/project");
const { expressFileUpload } = require("../module/express-fileupload");
const fileUpload = require("express-fileupload");
const router = require("express").Router();
router.post(
  "/create",
  checkLogin,
  fileUpload(),
  expressFileUpload,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
);
router.get("/", checkLogin, ProjectController.getAllProject);
router.get(
  "/:id",
  checkLogin,
  objectIdValidator(),
  expressValidatorMapper,
  ProjectController.getProjectById
);
router.delete(
  "/:id",
  checkLogin,
  objectIdValidator(),
  expressValidatorMapper,
  ProjectController.removeProject
);
router.put(
  "/:id",
  checkLogin,
  objectIdValidator(),
  updateProjectValidator(),
  expressValidatorMapper,
  ProjectController.updateProject
);
router.patch(
  "/edit-project-image/:id",
  checkLogin,
  fileUpload(),
  expressFileUpload,
  objectIdValidator(),
  expressValidatorMapper,
  ProjectController.updateProjectImage
);
module.exports = { projectRoutes: router };
objectIdValidator;
