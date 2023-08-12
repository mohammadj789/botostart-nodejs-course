const createHttpError = require("http-errors");
const { BlogModel } = require("../../../model/bolg");
const Controller = require("../controller");
const path = require("path");
const { removeErrorFile } = require("../../../utils/functions");
const {
  createBlogSchema,
} = require("../../validator/admin/blog.Schema");

class BlogContoller extends Controller {
  async createBlog(req, res, next) {
    try {
      if (req?.body?.fileUploadPath && req?.body?.fileName)
        req.body.image = path
          .join(req.body.fileUploadPath, req.body.fileName)
          ?.replace(/(\\)/gim, "/");

      await createBlogSchema.validateAsync(req.body);
      const blog = await BlogModel.create({
        ...req.body,
        author: req.user._id,
      });
      if (!blog) throw createHttpError.InternalServerError();
      res.status(201).send({
        dat: {
          status: 201,
          message: "blog was created successfully",
        },
      });
    } catch (error) {
      req?.body?.image && removeErrorFile(req.body.image);
      next(error);
    }
  }
  async getAllBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        {
          $lookup: {
            foreignField: "_id",
            localField: "author",
            from: "users",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $lookup: {
            foreignField: "_id",
            localField: "category",
            from: "categories",
            as: "category",
          },
        },

        {
          $project: {
            "author.otp": 0,
            "author.bills": 0,
            "author.discount": 0,
            "author.Role": 0,
          },
        },
        { $unwind: "$author" },
      ]);
      if (!blogs || blogs.length === 0)
        throw createHttpError.NotFound(
          "ther is not any blogs available"
        );
      res.status(200).json(blogs);
    } catch (error) {
      next(error);
    }
  }
  async getBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      res.status(200).json({ data: { status: 200, blog } });
    } catch (error) {
      next(error);
    }
  }

  async deleteBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      const deleteResult = await BlogModel.deleteOne({
        _id: blog._id,
      });
      if (deleteResult.deletedCount === 0)
        throw createHttpError.InternalServerError();

      res.status(200).json({
        data: {
          status: 200,
          message: "blog was seccessfully removed",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  // async getCommentOfBlog(req, res, next) {}
  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog({ _id: id });

      if (req?.body?.fileUploadPath && req?.body?.fileName)
        req.body.image = path
          .join(req.body.fileUploadPath, req.body.fileName)
          ?.replace(/(\\)/gim, "/");

      const data = req.body;
      console.log(data);

      const allowedUpdateFields = [
        "title",
        "tags",
        "text",
        "short_text",
        "category",
        "image",
      ];
      const nullishValues = ["", 0, null, undefined];
      Object.keys(data).forEach((item) => {
        if (!allowedUpdateFields.includes(item)) delete data[item];

        if ((typeof data[item])?.toLowerCase() === "string")
          data[item] = data[item].trim();

        if (Array.isArray(data[item]) && data[item].length > 0)
          data[item] = data[item].map((index) => index.trim());

        if (nullishValues.includes(data[item])) delete data[item];
      });
      const updateResult = await BlogModel.updateOne(
        { _id: id },
        {
          $set: {
            ...data,
            author: req.user._id,
          },
        }
      );
      if (updateResult.modifiedCount === 0)
        throw createHttpError.InternalServerError();
      res.status(200).send({
        dat: {
          status: 200,
          message: "blog was updated successfully",
        },
      });
    } catch (error) {
      req?.body?.image && removeErrorFile(req.body.image);
      next(error);
    }
  }
  async findBlog(query = {}) {
    const blog = await BlogModel.findOne(query).populate([
      {
        path: "category",
      },
      {
        path: "author",
        select: { bills: 0, Role: 0, otp: 0, discount: 0 },
      },
    ]);

    if (!blog) throw createHttpError.NotFound("no blog were found");

    return blog;
  }
}
module.exports = { BlogContoller: new BlogContoller() };
