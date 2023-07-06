const bcrypt = require("bcrypt");
const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  console.log(salt);

  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

const verifyHashPassword = (pass, hash) => {
  console.log(bcrypt.compareSync(pass, hash));
};

verifyHashPassword("123456", hashPassword("123456"));
