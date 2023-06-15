const express = require("express");

const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const serveIndex = require("serve-index");
const app = express();
app.use("/ftp", express.static("public/ftp"));
app.use(
  "/ftp",
  serveIndex("public/ftp", { icons: true, stylesheet: "style.css" })
);

app.get("/", (req, res) => {
  res.send("hi");
});

app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
