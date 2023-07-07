const { Strategy: LocalStrategy } = require("passport-local");
const userModel = require("./model/user.model");
const { compareSync } = require("bcrypt");

const passportInit = (passport) => {
  const authenticateduser = async (username, password, done) => {
    try {
      const user = await userModel.findOne({ username });
      if (!user)
        return done(null, false, { message: "not found user" });
      if (compareSync(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, {
        message: "username or password is incorrect",
      });
    } catch (error) {
      done(error);
    }
  };

  const localStrategy = new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    authenticateduser
  );
  const serializeUser = passport.serializeUser((user, done) => {
    return done(null, user.id, { message: "not found user" });
  });
  const deserializeUser = passport.deserializeUser(
    async (id, done) => {
      const user = await userModel.findOne({ _id: id });
      if (!user)
        return done(null, false, { message: "not found user" });
      return done(null, user, { message: "not found user" });
    }
  );
  passport.use(
    "local",
    localStrategy,
    serializeUser,
    deserializeUser
  );
};
module.exports = { passportInit };
