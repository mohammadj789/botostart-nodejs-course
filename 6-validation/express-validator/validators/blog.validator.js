const { param } = require("express-validator");

const idValidator = () =>
  param("id").isMongoId().withMessage("invalid object id");
module.exports = { idValidator };
