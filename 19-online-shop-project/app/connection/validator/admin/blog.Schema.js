const Joi = require("joi");
const { MONGO_ID_PATERN } = require("../../../utils/Constants");
const createHttpError = require("http-errors");

const createBlogSchema = Joi.object({
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
  // fileName: Joi.string()
  //   .pattern(/\.(png|jpg|jpeg)/)
  //   .error(
  //     createHttpError.BadRequest("text must be on string foramt")
  //   ),
  short_text: Joi.string()
    .required()
    .error(
      createHttpError.BadRequest(
        "short text must be on string foramt"
      )
    ),

  // tags: Joi.allow(),
  tags: Joi.array()
    // .pattern(/^[a-z0-9]{2,}(#[a-z]{2,})*/)

    .max(20)

    .error(createHttpError.BadRequest("tags mut be less than 20")),
  category: Joi.string()
    .required()
    .pattern(MONGO_ID_PATERN)
    .error(
      createHttpError.BadRequest("category id is not a valid one")
    ),
  fileUploadPath: Joi.allow(),
  fileName: Joi.allow(),
  image: Joi.allow(),
});

module.exports = { createBlogSchema };
