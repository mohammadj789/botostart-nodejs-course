const { Router } = require("express");
const { CategoryRoutes } = require("./category.routes");
const { BlogRoutes } = require("./blog.routes");

const router = Router();
/**
 * @swagger
 * tags:
 *    - name: Admin
 *      description: All routes related Admin (CRUD)
 *
 *    - name: Category(Admin)
 *      description: All routes related category and modifing them
 *    - name: Blog(Admin)
 *      description: All routes related Blogs and modifing them
 */

router.use("/category", CategoryRoutes);
router.use("/blog", BlogRoutes);

module.exports = { AdminRoutes: router };
