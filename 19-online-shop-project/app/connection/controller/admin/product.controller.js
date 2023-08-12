const createHttpError = require("http-errors");
const { ProductModel } = require("../../../model/product");
const {
  removeErrorFile,
  copyObject,
  purifyUpdateValues,
} = require("../../../utils/functions");

const {
  createProductSchema,
} = require("../../validator/admin/product.Schema");
const Controller = require("../controller");
const path = require("path");
const {
  ObjectIdValidator,
} = require("../../validator/public.validator");
const httpStatus = require("http-status");
class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      console.log(req.body);

      if (req?.body?.fileUploadPath && req?.body?.fileName) {
        req.body.images = [];
        req.body.fileName.forEach((element) => {
          req.body.images.push(
            path
              .join(req.body.fileUploadPath, element)
              ?.replace(/(\\)/gim, "/")
          );
        });
      }
      await createProductSchema.validateAsync(req.body);
      const {
        title,
        text,
        short_text,
        images,
        discount,
        count,
        tags,
        category,
        height,
        length,
        width,
        weight,
      } = req.body;
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        images,
        discount,
        count,
        tags,
        category,
        supplier: req.user._id,
        type:
          height || width || weight || length
            ? "physical"
            : "virtual",
        feature: { height, width, length, weight },
      });
      if (!product) throw createHttpError.InternalServerError();
      res
        .status(httpStatus.CREATED)
        .send({ status: httpStatus.CREATED, data: { product } });
    } catch (error) {
      req?.body?.images &&
        req.body.images.forEach((el) => removeErrorFile(el));

      next(error);
    }
  }

  async getAllProduct(req, res, next) {
    try {
      const search = req?.query?.search;
      let products;
      if (search) {
        products = await ProductModel.find({
          $text: { $search: search },
        });
      } else products = await ProductModel.find({});

      if (!products || products?.length === 0)
        throw createHttpError.NotFound();
      res
        .status(httpStatus.OK)
        .send({ status: httpStatus.OK, data: { products } });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await this.findProductById(id);
      res
        .status(httpStatus.OK)
        .json({ status: httpStatus.OK, product });
    } catch (error) {
      next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const data = copyObject(req.body);
      if (req?.body?.fileUploadPath && req?.body?.fileName) {
        req.body.images = [];
        req.body.fileName.forEach((element) => {
          req.body.images.push(
            path
              .join(req.body.fileUploadPath, element)
              ?.replace(/(\\)/gim, "/")
          );
        });
      }

      const blackList = [
        "comments",
        "like",
        "dislike",
        "bookmark",
        "supplier",
      ];
      purifyUpdateValues(data, blackList);

      const {
        title,
        text,
        short_text,
        images,
        discount,
        count,
        tags,
        category,
        height,
        length,
        width,
        weight,
      } = data;
      const updateResult = await ProductModel.updateOne(
        {
          _id: product._id,
        },
        {
          $set: {
            ...(title && { title }),
            ...(text && { text }),
            ...(short_text && { short_text }),
            ...(images && { images }),
            ...(discount && { discount }),
            ...(count && { count }),
            ...(tags && { tags }),
            ...(category && { category }),

            feature: { height, width, length, weight },
          },
        }
      );
      if (updateResult.modifiedCount === 0)
        throw createHttpError.InternalServerError();
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "product were updated successfully",
      });
    } catch (error) {
      req?.body?.images &&
        req.body.images.forEach((el) => removeErrorFile(el));
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const deleteResult = await ProductModel.deleteOne({
        _id: product._id,
      });
      if (deleteResult.deletedCount === 0)
        throw createHttpError.InternalServerError();
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "product were romoved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async findProductById(id) {
    await ObjectIdValidator.validateAsync({ id });
    const product = await ProductModel.findById(id);
    if (!product)
      throw createHttpError.NotFound("no product were found");
    return product;
  }
}
module.exports = { ProductController: new ProductController() };
