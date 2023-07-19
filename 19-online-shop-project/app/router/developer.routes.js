const { genSaltSync, hashSync } = require("bcrypt");
const { Router } = require("express");
const { randomNumberGenerator } = require("../utils/functions");

const router = Router();

/**
 * @swagger
 * tags:
 *    name: Developer-Routes
 *    description: developer utiles
 */

/**
 * @swagger
 * /dev/hash-pass/{password}:
 *  get:
 *    summary: hash password
 *    description: hash password using bcrypt from params
 *    parameters:
 *      - in: path
 *        name: password
 *        required: true
 *        type: string
 *    tags: [Developer-Routes]
 *    responses:
 *      200:
 *        description: Success
 */

router.get("/hash-pass/:password", (req, res, next) => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(req.params.password, salt);
  res.json({ hashedPassword });
});

/**
 * @swagger
 * /dev/random-number:
 *  get:
 *    summary: random number
 *    description: generate random number
 *    tags: [Developer-Routes]
 *    responses:
 *      200:
 *        description: Success
 */

router.get("/random-number", (req, res, next) => {
  res.json({ randomNumber: randomNumberGenerator().toString() });
});
module.exports = { DevRoutes: router };
