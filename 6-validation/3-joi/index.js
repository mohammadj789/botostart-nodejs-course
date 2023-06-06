const express = require("express");
const app = express();
const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");

const {
  loginValidatorSchema,
  registerValidationSchema,
} = require("./validator/auth.validator");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res, next) => {
  try {
    await loginValidatorSchema.validateAsync(req.body);
    res.send("accepted");
  } catch (error) {
    next(error);
  }
});
app.post(
  "/signup",

  async (req, res, next) => {
    try {
      await registerValidationSchema.validateAsync(req.body);
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
