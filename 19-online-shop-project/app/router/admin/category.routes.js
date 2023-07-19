const { Router } = require("express");
const {
  CategoryController,
} = require("../../connection/controller/admin/category.controller");
const router = Router();
/**
 * @swagger
 * tags:
 *    name: Admin
 *    description: All routes related Admin (CRUD)
 */

/**
 * @swagger

 * /admin/category/create:
 *  post:
 *    summary: add category
 *    description: Create a new category
 *    parameters:
 *      - in: formData
 *        name: title
 *        type: string
 *        required: true
 *      - in: formData
 *        name: parent
 *        type: string

 *    tags: [Admin]
 *    responses:
 *      201:
 *        description: Success
 *      403:
 *        description: unauthorized
 *      500:
 *        description: InternalServerError
 */

router.post("/create", CategoryController.addCategory);

/**
 * @swagger

 * /admin/category/parent:
 *  get:
 *    summary: get parents
 *    description: get all categories that are parents to others
 *    tags: [Admin]
 *    responses:
 *      200:
 *        description: Success
 *      403:
 *        description: unauthorized
 *      404:
 *        description: NotFound
 *      500:
 *        description: InternalServerError
 */

router.get("/parent", CategoryController.getAllParents);

/**
 * @swagger

 * /admin/category/children/{parent}:
 *  get:
 *    summary: get children
 *    description: get all categories which their parent is specified by id
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        requires: true
 *        type: string
 *        name: parent
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: NotFound
 *      403:
 *        description: unauthorized
 *      500:
 *        description: InternalServerError
 */

router.get("/children/:parent", CategoryController.getChildOfParent);

/**
 * @swagger

 * /admin/category/all:
 *  get:
 *    summary: get all categories
 *    tags: [Admin]

 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: NotFound
 *      403:
 *        description: unauthorized
 *      500:
 *        description: InternalServerError
 */

router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 * /admin/category/remove/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the category to remove
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: NotFound
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: InternalServerError
 */

router.delete("/remove/:id", CategoryController.deleteCategory);

/**
 * @swagger
 * /admin/category/{id}:
 *   get:
 *     summary: get category by ID
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the category to remove
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: NotFound
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: InternalServerError
 */

router.get("/:id", CategoryController.getCategoryById);

module.exports = { CategoryRoutes: router };
