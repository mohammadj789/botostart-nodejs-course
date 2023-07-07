const { hashSync } = require("bcrypt");
const { Router } = require("express");
const userModel = require("../model/user.model");
const { checkAuthRedirect, checkAuth } = require("../middleware");

const route = Router();

const initRoute = (passport) => {
  route.get("/", (req, res) => {
    res.render("index.ejs", { title: "Home" });
  });

  route.get("/login", checkAuthRedirect, (req, res) => {
    res.render("login.ejs", { title: "Login" });
  });

  route.get("/register", checkAuthRedirect, (req, res) => {
    res.render("register.ejs", { title: "Register" });
  });

  route.get("/profile", checkAuth, (req, res) => {
    const user = req.user;
    res.render("profile.ejs", {
      title: "Profile",
      user,
    });
  });

  route.get("/logout", checkAuth, (req, res) => {
    req.logOut({ keepSessionInfo: false }, (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/login");
    });
  });

  route.post(
    "/register",
    checkAuthRedirect,
    async (req, res, next) => {
      try {
        const { fullname: fullName, username, password } = req.body;
        const hashPassword = hashSync(password, 10);
        const user = await userModel.findOne({ username });
        if (user) {
          const referrer =
            req?.header("Referrer") ?? req.headers.referer;
          req.flash("error", "this username is already exist");
          return res.redirect(referrer ?? "/register");
        }
        await userModel.create({
          fullName,
          username,
          password: hashPassword,
        });
        res.redirect("/login");
      } catch (error) {
        next(error);
      }
    }
  );
  route.post(
    "/login",
    checkAuthRedirect,
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true,
    }),
    async (req, res, next) => {
      res.redirect("/profile");
    }
  );
  return route;
};

module.exports = { allRoutes: initRoute };
