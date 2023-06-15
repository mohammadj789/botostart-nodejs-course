class BlogController {
  getUser(req, res) {
    res.send("blogs");
  }
  createUser(req, res) {
    res.send("created");
  }
  deleteUser(req, res) {
    res.send(`deleted ${req.params.id}`);
  }
}
module.exports = { BlogController };
