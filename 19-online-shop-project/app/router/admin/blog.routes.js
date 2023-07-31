const { Router } = require("express");
const {
  BlogContoller,
} = require("../../connection/controller/admin/blog.controller");
const {
  multerUploadFile,
} = require("../../connection/middleware/multer");
const {
  stringToArray,
} = require("../../connection/middleware/stringToArray");
const {
  verifyAccessToken,
} = require("../../connection/middleware/varifyAccessToken");

const router = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      blog:
 *        type: object
 *        required:
 *          - title
 *          - text
 *          - short_text
 *          - category
 *          - image
 *        properties:
 *          title:
 *            type: string
 *            description: title of the blog
 *          text:
 *            type: string
 *            description: text of the blog
 *          short_text:
 *            type: string
 *            description: short_text of the blog
 *          category:
 *            type: string
 *            description: category id of the blog
 *          tags:
 *            type: string
 *            description: a list of tags related to blog
 *            example: "tag1#tag2#tag3#..."
 *          image:
 *            type: file
 *            description: image of the blog
 */

/**
 * @swagger
 *  /admin/blog:
 *    get:
 *      tags: [Blog(Admin)]
 *      summary: get list of all blogs
 *      responses:
 *        200:
 *          description: success
 *        404:
 *          description: notFound
 *        500:
 *          description: InternalServerError
 */
router.get("/", verifyAccessToken, BlogContoller.getAllBlogs);
/**
 * @swagger
 *  /admin/blog/add:
 *    post:
 *      tags: [Blog(Admin)]
 *      summary: create new blog
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#components/schemas/blog'
 *
 *      responses:
 *        201:
 *          description: created
 *        400:
 *          description: bad request
 *        401:
 *          description: unauthorized
 *        500:
 *          description: InternalServerError
 */
router.post(
  "/add",
  verifyAccessToken,
  multerUploadFile.single("image"),
  stringToArray("tags"),
  BlogContoller.createBlog
);

/**
 * @swagger
 *  /admin/blog/{id}:
 *    get:
 *      tags: [Blog(Admin)]
 *      summary: get a blog by its id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: success
 *        404:
 *          description: notFound
 *        500:
 *          description: InternalServerError
 */
router.get("/:id", verifyAccessToken, BlogContoller.getBlogById);

/**
 * @swagger
 *  /admin/blog/{id}:
 *    delete:
 *      tags: [Blog(Admin)]
 *      summary: delete a blog by its id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: success
 *        404:
 *          description: notFound
 *        500:
 *          description: InternalServerError
 */
router.delete(
  "/:id",
  verifyAccessToken,
  BlogContoller.deleteBlogById
);

/**
 * @swagger
 *  /admin/blog/update/{id}:
 *    patch:
 *      tags: [Blog(Admin)]
 *      summary: update an existing blog
 *      consumes:
 *        - multipart/form-data
 *        - application/x-www-form-data-urlencoded
 
 *      parameters:
 * 
 *        - in: path
 *          name: id
 *          required: true
 *          type: string
 *
 *        - in: formData
 *          name: title
 *          type: string
 *
 *        - in: formData
 *          name: text
 *          type: string
 *
 *        - in: formData
 *          name: tags
 *          example: tag1#tag2#tag3
 *          type:
 *
 *        - in: formData
 *          name: short_text
 *          type: string
 *
 *        - in: formData
 *          name: category
 *          type: string
 *
 *        - in: formData
 *          name: image
 *          type: file
 *
 *
 *      responses:
 *        200:
 *          description: updated successfully
 *        400:
 *          description: bad request
 *        401:
 *          description: unauthorized
 *        500:
 *          description: InternalServerError
 */
router.patch(
  "/update/:id",

  multerUploadFile.single("image"),
  stringToArray("tags"),
  BlogContoller.updateBlogById
);
module.exports = { BlogRoutes: router };
