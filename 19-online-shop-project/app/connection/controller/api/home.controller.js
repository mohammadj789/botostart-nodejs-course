const autoBind = require("auto-bind");
const Controller = require("../controller");
const { authSchema } = require("../../validator/user/auth.schema");
const createHttpError = require("http-errors");

class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      console.log(result);

      return res.status(200).send("index page of store");
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
}
module.exports = { HomeController: new HomeController() };
