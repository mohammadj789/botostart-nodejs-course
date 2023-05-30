const express = require("express");
const {
  NotFoundError,
  ErrorHandler,
} = require("./utils/errorHandler");
const path = require("path");
const hbs = require("hbs");
const app = express();

hbs.registerPartials(path.join(__dirname, "views/partials"));
app.set("view engine", "hbs");
app.use("/static", express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res, next) => {
  const users = [
    { id: 1, name: "user 1" },
    { id: 2, name: "user 2" },
    { id: 3, name: "user 3" },
  ];
  res.render("index", {
    link: "https://google.com",
    section: "my section of web page",
    users,
  });
});

app.use(NotFoundError);
app.use(ErrorHandler);
app.listen(3000, () =>
  console.log(`server is running on port 3000: http://localhost:3000`)
);
