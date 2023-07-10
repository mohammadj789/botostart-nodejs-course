const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
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
const verifyToken = (token) => {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result?.username)
    throw { status: 401, message: "please login to your account" };
  return result;
};
const createUploadPath = () => {
  const date = new Date();
  const Year = date.getFullYear() + "";
  const Month = date.getMonth() + "";
  const Day = date.getDate() + "";
  const address = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    Year,
    Month,
    Day
  );
  fs.mkdirSync(address, { recursive: true });
  return path.join("public", "uploads", Year, Month, Day);
};

module.exports = {
  createUploadPath,
  hashString,
  comparePassword,
  tokenGenerator,
  verifyToken,
};
