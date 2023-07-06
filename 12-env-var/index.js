const express = require("express");
const path = require("path");
const { config } = require("dotenv");
config();
const NodeEnv = process.env.NODE_ENV;

config({ path: path.join(__dirname, `.env.${NodeEnv}`) });
const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const app = express();
app.get("/", (req, res) => {
  res.send(process.env.API_KEY);
});

app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(process.env.PORT, () =>
  console.log(
    `server is running on port ${process.env.PORT}: http://localhost:${process.env.PORT}`
  )
);
