const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
const signToken = (payload) => {
  return sign(payload, "gnsdkjvnskjdgsldnfojk2n3rljnwe8fscv");
};
const verifyToken = (token) => {
  return verify(token, "gnsdkjvnskjdgsldnfojk2n3rljnwe8fscv");
};

module.exports = {
  comparePassword,
  hashPassword,
  signToken,
  verifyToken,
};
