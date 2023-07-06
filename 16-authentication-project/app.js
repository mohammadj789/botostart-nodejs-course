const express = require("express");
const { allRoutes } = require("./router/index.routes");
const { errorHandler } = require("./utils/errorHandler");
const { notFoundError } = require("./utils/notFoundError");
const { connect } = require("mongoose");
const app = express();
connect("mongodb://127.0.0.1:27017/auth-project");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);
app.use(errorHandler);
app.use(notFoundError);

app.listen(3000, () =>
  console.log(
    `server is running on port ${3000}.http://localhost:${3000}`
  )
);
