const { Router } = require("express");
const { getProfile } = require("../controller/profile.controller");

const route = Router();
route.post("/profile", getProfile);

module.exports = { profileRoutes: route };
