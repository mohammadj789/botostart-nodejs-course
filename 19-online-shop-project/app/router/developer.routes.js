const { genSaltSync, hashSync } = require("bcrypt");
const { Router } = require("express");
const { randomNumberGenerator } = require("../utils/functions");

const router = Router();

router.get("/hash-pass/:password", (req, res) => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(req.params.password, salt);
  res.json({ hashedPassword });
});

router.get("/random-number", (req, res) => {
  res.json({ randomNumber: randomNumberGenerator().toString() });
});
module.exports = { DevRoutes: router };
