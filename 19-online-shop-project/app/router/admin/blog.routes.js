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
 *  /admin/blog:
 *    get:
 *      tags: [Blog(Admin)]
 *      summary: get list of all blogs
 *      parameters:
 *        - in: header
 *          name: accesstoken
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
router.get("/", verifyAccessToken, BlogContoller.getAllBlogs);
/**
 * @swagger
 *  /admin/blog/add:
 *    post:
 *      tags: [Blog(Admin)]
 *      summary: create new blog
 *      consumes:
 *        - multipart/form-data
 *        - application/x-www-form-data-urlencoded
 
 *      parameters:
 *        - in: header
 *          name: accesstoken
 *          required: true
 *          type: string
 *
 *        - in: formData
 *          name: title
 *          required: true
 *          type: string
 *
 *        - in: formData
 *          name: text
 *          required: true
 *          type: string
 *
 *        - in: formData
 *          name: tags
 *          example: tag1#tag2#tag3
 *          type:
 *
 *        - in: formData
 *          name: short_text
 *          required: true
 *          type: string
 *
 *        - in: formData
 *          name: category
 *          required: true
 *          type: string
 *
 *        - in: formData
 *          name: image
 *          required: true
 *          type: file
 *
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
 *        - in: header
 *          name: accesstoken
 *          required: true
 *          type: string
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
 *        - in: header
 *          name: accesstoken
 *          required: true
 *          type: string
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
module.exports = { BlogRoutes: router };
