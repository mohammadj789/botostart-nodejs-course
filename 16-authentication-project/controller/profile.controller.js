async function getProfile(req, res, next) {
  res.send(req.user);
}
module.exports = { getProfile };
