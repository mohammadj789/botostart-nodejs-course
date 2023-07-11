const { body, param } = require("express-validator");

const createProjectValidator = () => {
  return [
    body("title").notEmpty().withMessage("title cannot be empty"),
    body("text")
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage("text must be at least 20 charecter long"),
    body("tags")
      .optional()
      .isArray({ min: 0, max: 10 })
      .withMessage("you can add tags up to 10"),
  ];
};
const objectIdValidator = () => {
  return [
    param("id").isMongoId().withMessage("project id is not valid"),
  ];
};
const updateProjectValidator = () => {
  return [
    body("title")
      .optional()

      .isLength({ min: 1 })
      .withMessage("must at least be 2 char long")
      .isAlphanumeric("en-US", { ignore: " " })
      .withMessage("enter a valid value"),
    body("text")
      .optional()

      .isLength({ min: 1 })
      .withMessage("must at least be 2 char long")
      .isAlphanumeric("en-US", { ignore: " " })
      .withMessage("enter a valid value"),
    body("tags")
      .optional()
      .isArray({ min: 0, max: 10 })
      .withMessage("you can add tags up to 10")
      .custom((val) => {
        val.forEach((tags) => {
          if (!/^[a-z]+[a-z]+/.test(tags)) {
            throw "tag you provided is not allowed";
          }
        });
        return true;
      }),
  ];
};
module.exports = {
  createProjectValidator,
  objectIdValidator,
  updateProjectValidator,
};
