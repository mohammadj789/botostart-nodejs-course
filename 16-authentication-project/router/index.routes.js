const { Router } = require("express");
const { authRoutes } = require("./auth.routes");

const { checkAuth } = require("../middleware/checkAuth");
const { profileRoutes } = require("./profile.routes");

const route = Router();
route.use("/auth", authRoutes);
route.use("/user", checkAuth, profileRoutes);
module.exports = { allRoutes: route };
