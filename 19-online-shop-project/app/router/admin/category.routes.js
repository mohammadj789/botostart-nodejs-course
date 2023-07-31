const { Router } = require("express");
const {
  CategoryController,
} = require("../../connection/controller/admin/category.controller");
const router = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      category:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *            description: title of the category
 *          parent:
 *            type: string
 *            description: parent id of the category
 */

/**
 * @swagger

 * /admin/category/create:
 *  post:
 *    summary: add category
 *    description: Create a new category
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/category'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/category'
 *    tags: [Category(Admin)]
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
 *    tags: [Category(Admin)]
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
 *    tags: [Category(Admin)]
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
 *    tags: [Category(Admin)]
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
 *       - Category(Admin)
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
 *       - Category(Admin)
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

/**
 * @swagger
 * /admin/category/update/{id}:
 *   patch:
 *     summary: update category title
 *     tags:
 *       - Category(Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the category to remove
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
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
router.patch("/update/:id", CategoryController.updateCategory);

module.exports = { CategoryRoutes: router };
