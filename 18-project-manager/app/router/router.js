const { authRoutes } = require("./auth.routes");
const { projectRoutes } = require("./project.routes");
const { teamRoutes } = require("./team.routes");
const { userRoutes } = require("./user.routes");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/project", projectRoutes);
router.use("/team", teamRoutes);
router.use("/user", userRoutes);
module.exports = { allRoutes: router };
