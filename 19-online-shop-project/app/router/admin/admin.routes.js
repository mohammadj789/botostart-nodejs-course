const { Router } = require("express");
const { CategoryRoutes } = require("./category.routes");
const { BlogRoutes } = require("./blog.routes");
const { ProductRoutes } = require("./product.routes");

const router = Router();
/**
 * @swagger
 * tags:
 *    - name: Admin
 *      description: All routes related Admin (CRUD)
 *
 *    - name: Category(Admin)
 *      description: All routes related category and modifing them
 *
 *    - name: Blog(Admin)
 *      description: All routes related Blogs and modifing them
 *
 *    - name: Product(Admin)
 *      description: All routes related yo pshycal an virtual products and its routes
 */

router.use("/category", CategoryRoutes);
router.use("/blog", BlogRoutes);
router.use("/product", ProductRoutes);

module.exports = { AdminRoutes: router };
