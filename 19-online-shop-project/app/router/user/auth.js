const { Router } = require("express");
const {
  UserAuthController,
} = require("../../connection/controller/user/auth/auth.controller");

const router = Router();

router.post("/get-otp", UserAuthController.getOtp);

router.post("/check-otp", UserAuthController.checkOtp);

router.post("/refresh-token", UserAuthController.refreshToken);
module.exports = { UserAuthRoutes: router };
