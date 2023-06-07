const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./uploads",
  //  (req, file, cb) => {
  //   cb(null, "./uploads");
  // },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const whiteListFormat = [
      ".png",
      ".jpeg",
      ".jpg",
      ".webp",
      ".pdf",
    ];
    if (whiteListFormat.includes(ext)) {
      const filename =
        Date.now() * Math.round((Math.random() + 2) * 13) + ext;
      cb(null, filename);
    } else {
      cb(new Error("only .png .jpeg .jpg .webp are allowed"));
    }
  },
});

const fileUpload = multer({
  storage,
  limits: { fileSize: 750000 },
});
module.exports = fileUpload;
