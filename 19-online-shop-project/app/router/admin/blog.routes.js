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

router.get("/", verifyAccessToken, BlogContoller.getAllBlogs);

router.post(
  "/add",
  verifyAccessToken,
  multerUploadFile.single("image"),
  stringToArray("tags"),
  BlogContoller.createBlog
);

router.get("/:id", verifyAccessToken, BlogContoller.getBlogById);

router.delete(
  "/:id",
  verifyAccessToken,
  BlogContoller.deleteBlogById
);

router.patch(
  "/update/:id",

  multerUploadFile.single("image"),
  stringToArray("tags"),
  BlogContoller.updateBlogById
);
module.exports = { BlogRoutes: router };
