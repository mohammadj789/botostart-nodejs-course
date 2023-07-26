const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../model/category");
const {
  createCategorySchema,
  getparendschildSchema,
} = require("../../validator/admin/category.schema");
const Controller = require("../controller");
const { default: mongoose } = require("mongoose");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await createCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createHttpError.InternalServerError();
      res.status(201).json({
        data: {
          status: 201,
          message: "category was created successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: undefined });
      if (!parents || parents?.length === 0)
        throw createHttpError.NotFound(
          "there is not any parent category"
        );
      res.status(200).json({ data: { parents } });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParent(req, res, next) {
    try {
      await getparendschildSchema.validateAsync(req.params);
      const { parent } = req.params;

      const children = await CategoryModel.find(
        { parent },
        { __v: 0, parent: 0 }
      );
      if (!children || children?.length === 0)
        throw createHttpError.NotFound(
          "there is not any child with this parent"
        );
      res.status(200).json({ data: { children } });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req, res, next) {
    try {
      // const categories = await CategoryModel.aggregate([
      //   { $match: { parent: undefined } },
      //   {
      //     $graphLookup: {
      //       from: "categories",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parent",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //     },
      //   },
      // ]);
      // const categories = await CategoryModel.aggregate([
      //   { $match: { parent: undefined } },
      //   {
      //     $lookup: {
      //       from: "categories",
      //       foreignField: "parent",
      //       localField: "_id",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //     },
      //   },
      // ]);
      const categories = await CategoryModel.find(
        {
          parent: undefined,
        },
        { __v: 0 }
      );

      if (!categories || categories?.length === 0)
        throw createHttpError.NotFound("there is not any category");
      res.status(200).json({ data: { categories } });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      await getparendschildSchema.validateAsync({ parent: id });
      const category = await this.checkExistingCategory(id);
      // const deleteResult = await CategoryModel.deleteOne(
      //   category._id
      // );
      const deleteResult = await CategoryModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteResult.deletedCount === 0)
        throw createHttpError.InternalServerError();
      res.status(200).json({
        data: {
          status: 200,
          message: "category was removed successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;

      await getparendschildSchema.validateAsync({ parent: id });
      const categories = await CategoryModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "categories",
            foreignField: "parent",
            localField: "_id",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
          },
        },
      ]);

      res.status(200).json({
        data: {
          status: 200,
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistingCategory(id) {
    const category = await CategoryModel.findById(id);

    if (!category) throw createHttpError.NotFound();
    return category;
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;

      await getparendschildSchema.validateAsync({ parent: id });
      await createCategorySchema.validateAsync(req.body);

      const category = await this.checkExistingCategory(id);

      const updateResult = await CategoryModel.updateOne(
        { _id: category._id },
        {
          $set: req.body,
        }
      );
      if (updateResult.modifiedCount === 0)
        throw createHttpError.InternalServerError();

      res.status(200).json({
        data: {
          status: 200,
          message: "category was updated successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { CategoryController: new CategoryController() };
