const { body } = require("express-validator");
const path = require("path");
const editValidator = () => {
  return [
    body("first_name")
      .optional()
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage("wrong name format"),
    body("last_name")
      .optional()
      .trim()
      .notEmpty()
      .isAlpha("en-US", { ignore: " " })
      .withMessage("wrong last name format"),
    body("skils")
      .optional()
      .isArray({ min: 1 })
      .withMessage("provide atleast one skill")
      .custom((val) => {
        val.forEach((skill) => {
          if (!/^[a-z]+[a-z\.]+/.test(skill)) {
            throw "skill you provided is not allowed";
          }
        });
        return true;
      }),
  ];
};
// const imageValidator = () => {
//   return [
//     body("image").custom((image, { req }) => {
//       if (Object.keys(req?.file) === 0)
//         throw "please select an image";
//       const ext = path.extname(req?.file?.originalname);

//       if (!/\.(png|jpg|jpeg)/.test(ext)) {
//         throw "this file type is not supported";
//       }
//       const maxSize = 2 * 1024 * 1024;

//       if (req?.file?.size > maxSize)
//         throw "file must be smaller than 2MB";
//       return true;
//     }),
//   ];
// };

module.exports = {
  editValidator,
  // imageValidator
};
