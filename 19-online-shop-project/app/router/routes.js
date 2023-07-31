const { Router } = require("express");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const { DevRoutes } = require("./developer.routes");
const { AdminRoutes } = require("./admin/admin.routes");
const {
  verifyAccessToken,
  checkRole,
} = require("../connection/middleware/varifyAccessToken");

const router = Router();
router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);
router.use("/dev", DevRoutes);
router.use(
  "/admin",
  verifyAccessToken,
  checkRole("ADMIN"),
  AdminRoutes
);

module.exports = { AllRoutes: router };
