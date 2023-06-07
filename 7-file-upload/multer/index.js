const express = require("express");

const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const fileUpload = require("./middleware/multer");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.post("/upload-single", fileUpload.single("image"), (req, res) => {
  res.send(req.file);
});
app.post(
  "/upload-array",
  fileUpload.array("image", 3),
  (req, res) => {
    res.send(req.files);
  }
);
app.post(
  "/upload-field",
  fileUpload.fields([
    { name: "image", maxCount: 2 },
    { name: "file", maxCount: 1 },
  ]),
  (req, res) => {
    res.send(req.files);
  }
);
app.post("/upload-any", fileUpload.any(), (req, res) => {
  res.send(req.files);
});
app.post("/upload-any", fileUpload.none(), (req, res) => {
  //content type ro pooshehsh midim
  res.send(req.body);
});

app.use(ErrorHandler);
app.use(NotFoundError);

app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
