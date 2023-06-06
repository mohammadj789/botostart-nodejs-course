const express = require("express");
const app = express();
const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const {
  loginValidator,
  signupValidator,
} = require("./validators/auth.validator");

const { checkValidation } = require("./middleware/validator");
const { idValidator } = require("./validators/blog.validator");
const { queryValidator } = require("./validators/query.validator");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post(
  "/login",
  loginValidator(),
  checkValidation,
  (req, res, next) => {
    try {
      res.send("accepted");
    } catch (error) {
      next(error);
    }
  }
);
app.post(
  "/signup",
  signupValidator(),
  checkValidation,
  (req, res, next) => {
    try {
      res.send("accepted");
    } catch (error) {
      next(error);
    }
  }
);
app.get(
  "/blogs/:id",
  idValidator(),
  checkValidation,
  (req, res, next) => {
    try {
      res.send("accepted");
    } catch (error) {
      next(error);
    }
  }
);
app.get(
  "/blogs",
  queryValidator(),
  checkValidation,
  (req, res, next) => {
    try {
      res.send("accepted");
    } catch (error) {
      next(error);
    }
  }
);
app.use(ErrorHandler);
app.use(NotFoundError);

app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
