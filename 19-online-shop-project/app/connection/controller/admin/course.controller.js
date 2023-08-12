const createHttpError = require("http-errors");
const { CourseModel } = require("../../../model/course");
const Controller = require("../controller");
const { removeErrorFile } = require("../../../utils/functions");
const httpStatus = require("http-status");
const path = require("path");
const {
  createCourseSchema,
} = require("../../validator/admin/course.Schema");
const {
  ObjectIdValidator,
} = require("../../validator/public.validator");
class CourseController extends Controller {
  async addCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);
      if (req?.body?.fileUploadPath && req?.body?.fileName)
        req.body.image = path
          .join(req.body.fileUploadPath, req.body.fileName)
          ?.replace(/(\\)/gim, "/");

      const {
        title,
        text,
        short_text,
        image,
        discount,
        tags,
        category,
        type,
      } = req.body;
      const course = await CourseModel.create({
        title,
        text,
        short_text,
        image,
        discount,
        tags,
        category,
        teacher: req.user._id,
        type,
      });
      if (!course) throw createHttpError.InternalServerError();
      res
        .status(httpStatus.CREATED)
        .send({ status: httpStatus.CREATED, data: { course } });
    } catch (error) {
      req?.body?.image && removeErrorFile(req.body.image);
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      const search = req?.query?.search;
      let courses;
      if (search)
        courses = await CourseModel.find({
          $text: { $search: search },
        }).sort({ _id: -1 });
      else courses = await CourseModel.find({}).sort({ _id: -1 });

      if (!courses || courses?.length === 0)
        throw createHttpError.NotFound("no course were found");
      res.status(200).json({ status: 200, courses });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const id = req?.params?.id;

      await ObjectIdValidator.validateAsync(req.params);
      const course = await CourseModel.findById(id);

      if (!course)
        throw createHttpError.NotFound("no course were found");
      res.status(200).json({ status: 200, course });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { CourseController: new CourseController() };
