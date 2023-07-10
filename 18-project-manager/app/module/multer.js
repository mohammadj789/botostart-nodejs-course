const multer = require("multer");
const path = require("path");
const { createUploadPath } = require("./functions");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, createUploadPath());
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    if (!/\.(png|jpg|jpeg)/.test(ext))
      return cb(new Error("this file type is not supported"));

    const filename =
      Date.now() * Math.round((Math.random() + 2) * 13) + ext;
    return cb(null, filename);
  },
});
const fileUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});
module.exports = { upload_multer: fileUpload };
