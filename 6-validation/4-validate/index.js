const express = require("express");
const app = express();
const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const { registerSchema } = require("./validator/auth.validator");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res, next) => {
  try {
    res.send("accepted");
  } catch (error) {
    next(error);
  }
});
app.post(
  "/signup",

  (req, res, next) => {
    try {
      const [error] = registerSchema.validate(req.body);
      if (error) throw error;
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
