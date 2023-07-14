const { Router } = require("express");
const {
  HomeController,
} = require("../../connection/controller/api/home.controller");

const router = Router();
router.post("/", HomeController.indexPage);

module.exports = { HomeRoutes: router };
