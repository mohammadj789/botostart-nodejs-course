const express = require("express");

const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(
  fileUpload({
    abortOnLimit: true,
    limits: { fileSize: 150000, fields: 3 },
  })
);
app.post("/upload", (req, res) => {
  const { image } = req.files;
  const ext = path.extname(image.name);
  const dest = path.join(
    __dirname,
    "uploads",
    Date.now() * Math.round((Math.random() + 2) * 13) + ext
  );

  // const buffer = Buffer.from(image.data);
  const buffer = image.data;

  fs.writeFileSync(dest, buffer);
  res.send(req.files);
});
app.post("/upload-mv", (req, res) => {
  if ((!req.files, Object.keys(req.files).length === 0)) {
    throw { status: 400, message: "no file were uploaded" };
  }
  // const { image, file } = req.files;
  for (const key in req.files) {
    const file = req.files[key];
    if (Array.isArray(file)) {
      file.forEach((element) => {
        const ext = path.extname(element.name);
        const dest = path.join(
          __dirname,
          "uploads",
          Date.now() * Math.round((Math.random() + 2) * 13) + ext
        );

        element.mv(dest, (err) => {
          if (err) {
            throw { status: 400, message: "error uploading file" };
          }
        });
      });
    } else {
      const ext = path.extname(file.name);
      const dest = path.join(
        __dirname,
        "uploads",
        Date.now() * Math.round((Math.random() + 2) * 13) + ext
      );

      file.mv(dest, (err) => {
        if (err) {
          throw { status: 400, message: "error uploading file" };
        }
      });
    }
  }

  res.send("file uploaded to destination");
});

app.use(ErrorHandler);
app.use(NotFoundError);

app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
