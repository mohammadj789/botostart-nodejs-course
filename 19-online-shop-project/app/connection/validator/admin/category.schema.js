const Joi = require("joi");
const { MONGO_ID_PATERN } = require("../../../utils/Constants");
const createCategorySchema = Joi.object({
  title: Joi.string()
    .required()
    .trim()
    .min(3)
    .error(
      new Error("Category title must be at least 3 characters long")
    ),
  parent: Joi.string()
    .optional()
    .pattern(MONGO_ID_PATERN)
    .error(new Error("Please enter a valid object id")),
});
const getparendschildSchema = Joi.object({
  parent: Joi.string()
    .required()
    .pattern(MONGO_ID_PATERN)
    .error(new Error("Please enter a valid object id")),
});

module.exports = { createCategorySchema, getparendschildSchema };
