const crypto = require("crypto");

const hashPassword = (pass) => {
  // const salt = crypto.randomBytes(16).toString("hex"); //changes everytime
  const salt = "3d9eb3ee0ec03ac784c9cc0e9a5d01bc";
  const hash = crypto
    .pbkdf2Sync(pass, salt, 1000, 64, "sha1")
    .toString("hex");
  return `2s.${salt}.${hash}`;
};

const verifyHashPassword = (pass, hashed) => {
  const salt = hashed.split(".")?.[1];
  console.log(salt);

  const hash = `2s.${salt}.${crypto
    .pbkdf2Sync(pass, salt, 1000, 64, "sha1")
    .toString("hex")}`;

  console.log(hash === hashed);
};

const hashedPassword = hashPassword("123456");
verifyHashPassword("123456", hashedPassword);
