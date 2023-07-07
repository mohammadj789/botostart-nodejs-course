const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("express-flash");
const session = require("express-session");
const { connect } = require("mongoose");
const { allRoutes } = require("./router/index.routes");
const { ErrorHandler, NotFoundError } = require("./errorHandler");
const passport = require("passport");
const { passportInit } = require("./pasport.config");
const app = express();
connect("mongodb://127.0.0.1:27017/auth-project");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layout/main.ejs");
app.use(
  session({
    secret: "secretkeyforsessioon",
    resave: false,
    saveUninitialized: false,
  })
);
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(allRoutes(passport));
app.use(NotFoundError);
app.use(ErrorHandler);
app.listen(3000, () =>
  console.log(
    `server is running on port ${3000}.http://localhost:${3000}`
  )
);
