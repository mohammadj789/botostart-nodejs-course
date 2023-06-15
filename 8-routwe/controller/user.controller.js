const getUser = (req, res) => {
  res.send("users");
};
const createUser = (req, res) => {
  res.send("created");
};
const deleteUser = (req, res) => {
  res.send(`deleted ${req.params.id}`);
};
module.exports = { getUser, createUser, deleteUser };
