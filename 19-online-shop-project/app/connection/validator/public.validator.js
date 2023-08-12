const Joi = require("joi");
const { MONGO_ID_PATERN } = require("../../utils/Constants");
const createHttpError = require("http-errors");
const ObjectIdValidator = Joi.object({
  id: Joi.string()
    .pattern(MONGO_ID_PATERN)
    .required()
    .error(createHttpError.BadRequest("invalid object id")),
});

module.exports = { ObjectIdValidator };
