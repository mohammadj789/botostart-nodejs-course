const { Router } = require("express");
const {
  ProductController,
} = require("../../connection/controller/admin/product.controller");
const {
  multerUploadFile,
} = require("../../connection/middleware/multer");
const {
  stringToArray,
} = require("../../connection/middleware/stringToArray");

const router = Router();

router.post(
  "/add",
  multerUploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("fileName"),
  ProductController.addProduct
);

router.get("/", ProductController.getAllProduct);

router.get("/:id", ProductController.getOneProduct);

router.delete("/:id", ProductController.removeProduct);

router.patch(
  "/edit/:id",
  multerUploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("fileName"),
  ProductController.editProduct
);

module.exports = { ProductRoutes: router };
