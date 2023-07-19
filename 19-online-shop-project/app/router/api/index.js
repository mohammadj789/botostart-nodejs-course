const { Router } = require("express");
const {
  HomeController,
} = require("../../connection/controller/api/home.controller");
const {
  verifyAccessToken,
} = require("../../connection/middleware/varifyAccessToken");
/**
 * @swagger
 * tags:
 *    name: IndexPage
 *    description: index page routes and data
 */

/**
 * @swagger

 * /:
 *  get:
 *    summary: Index of routes
 *    description: Get all data for index page
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        example: Bearer your-access-token
 *    tags: [IndexPage]
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: notFound
 *
 */

const router = Router();
router.get("/", verifyAccessToken, HomeController.indexPage);

module.exports = { HomeRoutes: router };
