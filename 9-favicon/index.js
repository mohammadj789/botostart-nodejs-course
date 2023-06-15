const express = require("express");
const serveFavicon = require("serve-favicon");
const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const path = require("path");
const app = express();

app.use(serveFavicon(path.join(__dirname, "icon.webp")));

app.get("/", (req, res) => {
  res.send("hi");
});

app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
