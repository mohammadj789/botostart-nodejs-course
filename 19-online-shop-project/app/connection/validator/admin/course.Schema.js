const Joi = require("joi");
const { MONGO_ID_PATERN } = require("../../../utils/Constants");
const createHttpError = require("http-errors");

const createCourseSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(
      createHttpError.BadRequest(
        "title must be in range of 3 and 30 charecters"
      )
    ),
  text: Joi.string()
    .required()
    .error(
      createHttpError.BadRequest("text must be on string foramt")
    ),

  short_text: Joi.string()
    .required()
    .error(
      createHttpError.BadRequest(
        "short text must be on string foramt"
      )
    ),
  tags: Joi.array()
    .max(20)
    .required()
    .error(createHttpError.BadRequest("tags mut be less than 20")),
  category: Joi.string()
    .required()
    .pattern(MONGO_ID_PATERN)
    .error(
      createHttpError.BadRequest("category id is not a valid one")
    ),
  price: Joi.number()
    .required()
    .error(createHttpError.BadRequest("price format is not correct")),
  discount: Joi.number()
    .required()
    .error(
      createHttpError.BadRequest("discount format is not correct")
    ),
  type: Joi.string()
    .required()
    .pattern(/(free|paid|special)/i)
    .error(
      createHttpError.BadRequest(
        "type must be free or paid or special"
      )
    ),
  fileUploadPath: Joi.allow(),
  fileName: Joi.allow(),
});

module.exports = { createCourseSchema };
