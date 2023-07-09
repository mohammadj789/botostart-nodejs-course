const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const hashString = (str) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(str, salt);
  return hash;
};
const comparePassword = (password, hasshedPassword) => {
  const hash = bcrypt.compareSync(password, hasshedPassword);
  return hash;
};
const tokenGenerator = (payload) => {
  const token = jwt.sign(
    { username: payload },
    process.env.SECRET_KEY,
    {
      expiresIn: "5d",
    }
  );

  return token;
};
module.exports = { hashString, comparePassword, tokenGenerator };
