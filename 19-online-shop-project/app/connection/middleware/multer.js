const multer = require("multer");
const path = require("path");

const fs = require("fs");


const createHttpError = require("http-errors");
const createRoute = (req) => {
  const date = new Date();
  const day = date.getDay() + "";
  const month = date.getMonth() + "";
  const year = date.getFullYear() + "";
  req.body.fileUploadPath = path.join(
    "uploads",
    "blogs",
    year,
    month,
    day
  );

  return path.join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    month,
    day
  );
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const path = createRoute(req);
      fs.mkdirSync(path, { recursive: true });
      return cb(null, path);
    }

    cb(null, null);
  },
  filename: async (req, file, cb) => {
    if (file?.originalname) {
      const ext = path.extname(file.originalname);
      const fileName =
        Date.now() * Math.round((Math.random() + 2) * 13) + ext;

      if (req.body.fileName) req.body.fileName += `#${fileName}`;
      else req.body.fileName = fileName;
      return cb(null, fileName);
    }

    cb(null, null);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (!/\.(png|jpg|jpeg)/.test(ext))
    return cb(
      createHttpError.BadRequest("this file type is not supported")
    );
  cb(null, true);
};
const maxSize = 2 * 1024 * 1024;
const multerUploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
});
module.exports = { multerUploadFile };
