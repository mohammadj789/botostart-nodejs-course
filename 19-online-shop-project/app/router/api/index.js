const { Router } = require("express");
const {
  HomeController,
} = require("../../connection/controller/api/home.controller");
const {
  verifyAccessToken,
} = require("../../connection/middleware/varifyAccessToken");

const router = Router();
router.get("/", verifyAccessToken, HomeController.indexPage);

module.exports = { HomeRoutes: router };
