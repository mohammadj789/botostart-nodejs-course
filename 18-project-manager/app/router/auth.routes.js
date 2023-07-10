const {
  AuthController,
} = require("../http/controller/auth.controller");
const {
  expressValidatorMapper,
} = require("../http/middleware/checkError");
const {
  registerValidator,
  loginValidator,
} = require("../http/validation/auth");

const router = require("express").Router();
router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  AuthController.register
);

router.post(
  "/login",
  loginValidator(),
  expressValidatorMapper,
  AuthController.login
);

module.exports = { authRoutes: router };
