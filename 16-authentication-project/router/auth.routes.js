const { Router } = require("express");
const { register, login } = require("../controller/auth.controller");

const route = Router();
route.post("/register", register);
route.post("/login", login);
module.exports = { authRoutes: route };
