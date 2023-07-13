const {
  UserController,
} = require("../http/controller/user.controller");
const { checkLogin } = require("../http/middleware/autoLogin");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkError");
const {
  editValidator,
  userInviteRequestValidator,
} = require("../http/validation/user");
const { upload_multer } = require("../module/multer");

const router = require("express").Router();

router.get("/profile", checkLogin, UserController.getProfile);
router.post(
  "/profile",
  checkLogin,
  editValidator(),
  expressValidatorMapper,
  UserController.editProfile
);
router.post(
  "/profile-image",
  checkLogin,
  upload_multer.single("image"),
  UserController.uploadProfileImage
);
router.get("/requests", checkLogin, UserController.getAllRequests);
router.get(
  "/requests/:status",
  checkLogin,
  UserController.getRequestsByStatus
);
router.get(
  "/requests/change-status/:id/:status",
  checkLogin,
  userInviteRequestValidator(),
  expressValidatorMapper,
  UserController.changeStatusRequest
);

module.exports = { userRoutes: router };
