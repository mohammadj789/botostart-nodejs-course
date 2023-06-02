const express = require("express");
const app = express();
const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const { loginValidator } = require("./validator/auth.validator");
const { validate } = require("express-validation");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", validate(loginValidator), (req, res, next) => {
  try {
    res.send("accepted");
  } catch (error) {
    next(error);
  }
});

app.use(ErrorHandler);
app.use(NotFoundError);

app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
