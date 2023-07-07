const checkAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};
const checkAuthRedirect = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return next();
};
module.exports = { checkAuth, checkAuthRedirect };
