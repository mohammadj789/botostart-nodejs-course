const express = require("express");
const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const allRoutes = require("./router/index.router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(allRoutes);

app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
