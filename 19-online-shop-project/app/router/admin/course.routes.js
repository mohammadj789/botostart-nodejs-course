const { Router } = require("express");
const router = Router();
const {
  CourseController,
} = require("../../connection/controller/admin/course.controller");
const {
  stringToArray,
} = require("../../connection/middleware/stringToArray");
const {
  multerUploadFile,
} = require("../../connection/middleware/multer");

router.post(
  "/add",
  multerUploadFile.single("image"),
  stringToArray("tags"),
  CourseController.addCourse
);
router.get("/all", CourseController.getAll);

router.get("/:id", CourseController.getById);
module.exports = { courseRoutes: router };
