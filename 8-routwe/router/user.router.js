const { Router } = require("express");
const {
  getUser,
  createUser,
  deleteUser,
} = require("../controller/user.controller");

const router = Router();
router.get("/", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
module.exports = router;
