const { Router } = require("express");
const { HomeRoutes } = require("./api");

const router = Router();
router.use("/", HomeRoutes);

module.exports = { AllRoutes: router };
