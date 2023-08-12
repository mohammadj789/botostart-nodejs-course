const { Router } = require("express");
const { CategoryRoutes } = require("./category.routes");
const { BlogRoutes } = require("./blog.routes");
const { ProductRoutes } = require("./product.routes");
const { courseRoutes } = require("./course.routes");

const router = Router();

router.use("/category", CategoryRoutes);
router.use("/blog", BlogRoutes);
router.use("/product", ProductRoutes);
router.use("/course", courseRoutes);

module.exports = { AdminRoutes: router };
