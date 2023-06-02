const { query } = require("express-validator");

const queryValidator = () => [
  query("title")
    .not()
    .isEmpty()
    .matches(/[a-z0-9]+/gim),
  query("sort")
    .matches(/ASC|DESC/)
    .withMessage("Not valid sort method"),
];

module.exports = { queryValidator };
