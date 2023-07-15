const { Router } = require("express");
const {
  HomeController,
} = require("../../connection/controller/api/home.controller");
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
 *    tags: [IndexPage]
 *    responses:
 *      200:
 *        description: Success
 *      204:
 *        description: notFound
 *
 */

const router = Router();
router.get("/", HomeController.indexPage);

module.exports = { HomeRoutes: router };
