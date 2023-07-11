const path = require("path");
const { createUploadPath } = require("./functions");
const uploadFile = async (req, res, next) => {
  try {
    if (!req.files)
      throw {
        status: 400,
        message: "please select a file to upload",
      };
    const image = req.files.image;
    const ext = path.extname(image.name);
    if (!/\.(png|jpg|jpeg)/.test(ext))
      throw {
        status: 400,
        message: "this format is not valid",
      };
    const image_path = path.join(
      createUploadPath(),
      Date.now() * Math.round((Math.random() + 2) * 13) + ext
    );
    req.body.image = image_path.substring(7);
    const uploadPath = path.join(__dirname, "..", "..", image_path);

    image.mv(uploadPath, (error) => {
      if (error)
        throw {
          status: 500,
          message: "something went wrong while uploading",
        };
      next();
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { expressFileUpload: uploadFile };
