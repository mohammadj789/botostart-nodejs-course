const { Router } = require("express");
const {
  ProductController,
} = require("../../connection/controller/admin/product.controller");
const {
  multerUploadFile,
} = require("../../connection/middleware/multer");
const {
  stringToArray,
} = require("../../connection/middleware/stringToArray");
const productController = require("../../connection/controller/admin/product.controller");

const router = Router();
/**
 * @swagger
 *   components:
 *    schemas:
 *      product:
 *        type: object
 *        required:
 *          - title
 *          - text
 *          - short_text
 *          - tags
 *          - category
 *          - discount
 *          - count
 *          - price
 *        properties:
 *          title:
 *            type: string
 *            description: title of the product
 *          text:
 *            type: string
 *            description: text of the product
 *          short_text:
 *            type: string
 *            description: short intro to the product
 *          images:
 *            type: array
 *            items:
 *              type: file
 *              format: binary
 *            description: images of the product
 *
 *          price:
 *            type: string
 *            description: price of the product
 *          discount:
 *            type: string
 *            description: discount on the product
 *          count:
 *            type: string
 *            description: count of the product
 *          tags:
 *            type: array
 *            description: tags related to the product
 *          category:
 *            type: string
 *            description: category of product (objectId)
 *          height:
 *            type: string
 *            description: height of the product
 *          length:
 *            type: string
 *            description: length of the product
 *          width:
 *            type: string
 *            description: width of the product
 *          weight:
 *            type: string
 *            description: weight of the product
 */
/**
 * @swagger
 *   components:
 *    schemas:
 *      product-edit:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *            description: title of the product
 *          text:
 *            type: string
 *            description: text of the product
 *          short_text:
 *            type: string
 *            description: short intro to the product
 *          images:
 *            type: array
 *            items:
 *              type: file
 *              format: binary
 *            description: images of the product
 *
 *          price:
 *            type: string
 *            description: price of the product
 *          discount:
 *            type: string
 *            description: discount on the product
 *          count:
 *            type: string
 *            description: count of the product
 *          tags:
 *            type: array
 *            description: tags related to the product
 *          category:
 *            type: string
 *            description: category of product (objectId)
 *          height:
 *            type: string
 *            description: height of the product
 *          length:
 *            type: string
 *            description: length of the product
 *          width:
 *            type: string
 *            description: width of the product
 *          weight:
 *            type: string
 *            description: weight of the product
 */

/**
 * @swagger
 *  /admin/product/add:
 *    post:
 *      summary: create a new product
 *      tags: [Product(Admin)]
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/product'
 *      responses:
 *        201:
 *          description: created
 *        403:
 *          description: forbiden
 *        401:
 *          description: unauthorized
 *        500:
 *          description: internalservererror
 */
router.post(
  "/add",
  multerUploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("fileName"),
  ProductController.addProduct
);
/**
 * @swagger
 *  /admin/product:
 *    get:
 *      summary: get all products
 *      tags: [Product(Admin)]
 *      parameters:
 *        - in: query
 *          type: string
 *          name: search
 *      responses:
 *        200:
 *          description: created
 *        403:
 *          description: forbiden
 *        401:
 *          description: unauthorized
 *        404:
 *          description: not found
 */
router.get("/", ProductController.getAllProduct);

/**
 * @swagger
 *  /admin/product/{id}:
 *    get:
 *      summary: get one product by id
 *      tags: [Product(Admin)]
 *      parameters:
 *        - in: path
 *          type: string
 *          name: id
 *          required: true
 *          description: object id of product
 *      responses:
 *        200:
 *          description: created
 *        403:
 *          description: forbiden
 *        401:
 *          description: unauthorized
 *        404:
 *          description: not found
 */
router.get("/:id", ProductController.getOneProduct);
/**
 * @swagger
 *  /admin/product/{id}:
 *    delete:
 *      summary: remove one product by id
 *      tags: [Product(Admin)]
 *      parameters:
 *        - in: path
 *          type: string
 *          name: id
 *          required: true
 *          description: object id of product
 *      responses:
 *        200:
 *          description: removed
 *        403:
 *          description: forbiden
 *        401:
 *          description: unauthorized
 *        404:
 *          description: not found
 */
router.delete("/:id", ProductController.removeProduct);
/**
 * @swagger
 *  /admin/product/edit/{id}:
 *    patch:
 *      summary: update one product by id
 *      tags: [Product(Admin)]
 *      parameters:
 *        - in: path
 *          type: string
 *          name: id
 *          required: true
 *          description: object id of product
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/product-edit'
 *      responses:
 *        200:
 *          description: updated
 *        403:
 *          description: forbiden
 *        401:
 *          description: unauthorized
 *        404:
 *          description: not found
 */
router.patch(
  "/edit/:id",
  multerUploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("fileName"),
  ProductController.editProduct
);

module.exports = { ProductRoutes: router };
