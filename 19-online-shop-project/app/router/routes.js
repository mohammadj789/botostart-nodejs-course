const { Router } = require("express");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");

const router = Router();
router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);

module.exports = { AllRoutes: router };
