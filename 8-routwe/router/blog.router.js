const { Router } = require("express");
const {
  BlogController,
} = require("../controller/blog.controller copy");
const blogController = new BlogController();
const router = Router();
router.get("/", blogController.getUser);
router.post("/", blogController.createUser);
router.delete("/:id", blogController.deleteUser);
module.exports = router;
