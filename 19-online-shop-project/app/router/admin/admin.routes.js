const { Router } = require("express");
const { CategoryRoutes } = require("./category.routes");

const router = Router();

router.use("/category", CategoryRoutes);

module.exports = { AdminRoutes: router };
