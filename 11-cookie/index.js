const express = require("express");

const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("cookieName", "cookieValue");
  res.send("saved");
});
app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies;
  res.send(cookie);
});

app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
