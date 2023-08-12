const { Router } = require("express");
const {
  CategoryController,
} = require("../../connection/controller/admin/category.controller");
const router = Router();

router.post("/create", CategoryController.addCategory);

router.get("/parent", CategoryController.getAllParents);

router.get("/children/:parent", CategoryController.getChildOfParent);

router.get("/all", CategoryController.getAllCategory);

router.delete("/remove/:id", CategoryController.deleteCategory);

router.get("/:id", CategoryController.getCategoryById);

router.patch("/update/:id", CategoryController.updateCategory);

module.exports = { CategoryRoutes: router };
